import { checkSchema } from 'express-validator';

export const validateNewProductBody = checkSchema({
    year:{
        isInt:true,
        customSanitizer:{
            options:(value)=>{
                return parseInt(value);
            },

        }
    }
})