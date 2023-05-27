import { plainToInstance } from 'class-transformer';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  validate,
} from 'class-validator';
import { WordType } from 'src/words/schemas/word.schema';
import { NounDto } from '../noun.dto';
import { VerbDto } from '../verb.dto';

/**
 * Custom validator which tests wordData IS object and wordData value
 * is valid for the wordType used.
 */
export function IsValidWordData(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidWordData',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          if (!value || typeof value !== 'object' || Array.isArray(value)) {
            return false;
          }
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          let valid = false;
          switch (relatedValue) {
            case WordType.NOUN:
              const nounData = plainToInstance(NounDto, value);
              await validate(nounData).then((errors) => {
                if (errors.length === 0) valid = true;
              });
              break;

            case WordType.VERB:
              const verbData = plainToInstance(VerbDto, value);
              await validate(verbData).then((errors) => {
                if (errors.length === 0) valid = true;
              });
              break;

            case WordType.ADJ:
              valid = Object.keys(value).length === 0;
              break;

            default:
              break;
          }
          return valid;
        },
      },
    });
  };
}
