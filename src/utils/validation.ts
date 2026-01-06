// viết hàm validate nhận vào checkSchema
// và trả ra middleware xử lí lỗi

import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  //
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    } else {
      res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ message: ' Validation Failed', errors: errors.mapped() })
    }
  }
}
