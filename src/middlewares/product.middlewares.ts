// viết hàm kiểm tra req.query của chức năng lọc các sản phẩm theo các tiêu chí khác nhau như: danh mục giá màu sắc , tiền , kich thước

import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/model/Errors'
import { validate } from '~/utils/validation'

export const checkAllowedQueryParams = (req: Request, res: Response, next: NextFunction) => {
  const allowedParams = ['CategoryId', 'minPrice', 'maxPrice', 'Materials', 'Sizes', 'Colors']
  const receivedParams = Object.keys(req.query)

  const invalidParams = receivedParams.filter((param) => !allowedParams.includes(param))

  if (invalidParams.length > 0) {
    throw new ErrorWithStatus({
      message: `Invalid query params: ${invalidParams.join(', ')}. Only allowed: ${allowedParams.join(', ')}`,
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY
    })
  }

  next()
}

export const ProductFilterValidator = validate(
  checkSchema(
    {
      CategoryId: {
        optional: true,
        customSanitizer: {
          options: (value) => {
            if (value && !Array.isArray(value)) {
              return [value]
            }
            return value
          }
        }
      },
      'CategoryId.*': {
        isInt: { errorMessage: 'Mỗi CategoryId phải là số nguyên' },
        toInt: true
      },

      minPrice: {
        optional: true,
        isFloat: { errorMessage: 'minPrice must be a number' },
        toFloat: true
      },
      maxPrice: {
        optional: true,
        isFloat: { errorMessage: 'maxPrice must be a number' },
        toFloat: true
      },
      Materials: {
        optional: true,

        isString: { errorMessage: 'Material must be a string' }
      },
      'Materials.*': {
        trim: true,
        isString: true
      },
      Sizes: {
        optional: true,

        isString: { errorMessage: 'Size must be a string' }
      },
      'Sizes.*': { isString: true, trim: true },
      Colors: {
        optional: true,

        isString: { errorMessage: 'Color must be a string' }
      },
      'Colors.*': { isString: true, trim: true }
    },
    ['query']
  )
)
