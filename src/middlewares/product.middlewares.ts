// viết hàm kiểm tra req.query của chức năng lọc các sản phẩm theo các tiêu chí khác nhau như: danh mục giá màu sắc , tiền , kich thước

import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/model/Errors'
import { validate } from '~/utils/validation'
const allowedQueryParams = ['CategoryId', 'minPrice', 'maxPrice', 'Materials', 'Sizes', 'Colors']
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
      'Colors.*': { isString: true, trim: true },

      _checkUnknownParams: {
        custom: {
          options: (_value, meta) => {
            const req = meta.req
            const invalid = Object.keys(req.query || {}).filter((key) => !allowedQueryParams.includes(key))
            if (invalid.length > 0) {
              throw new ErrorWithStatus({
                message: `Invalid query params: ${invalid.join(', ')}. Allowed: ${allowedQueryParams.join(', ')}`,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)
