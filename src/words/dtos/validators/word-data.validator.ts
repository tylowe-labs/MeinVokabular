import { plainToInstance } from 'class-transformer';
import { registerDecorator, ValidationOptions, ValidationArguments, validate } from 'class-validator';
import { WordType } from 'src/words/schemas/word.schema';
import { NounDto } from '../noun.dto';


export function IsValidWordData(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidWordData',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          let valid = false;
          switch (relatedValue) {
            case WordType.NOUN:
                const nounData = plainToInstance(NounDto, value);
                await validate(nounData).then(errors => {
                    if (errors.length === 0) valid = true;
                });
                break;

            case WordType.VERB:
                break;

            case WordType.ADJ:
                
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