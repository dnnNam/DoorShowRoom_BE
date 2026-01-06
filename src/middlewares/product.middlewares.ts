// viết hàm kiểm tra req.query của chức năng lọc các sản phẩm theo các tiêu chí khác nhau như: danh mục giá màu sắc , tiền , kich thước

import { checkSchema } from 'express-validator'

export const ProductFilterValidator = checkSchema(
  {
    CategoryId: {
      optional: true,
      toArray: true
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
    Material: {
      optional: true,
      toArray: true,
      isString: { errorMessage: 'Material must be a string' }
    },
    'Material.*': {
      trim: true,
      isString: true
    },
    Size: {
      optional: true,
      toArray: true,
      isString: { errorMessage: 'Size must be a string' }
    },
    'Size.*': { isString: true, trim: true },
    Color: {
      optional: true,
      toArray: true,
      isString: { errorMessage: 'Color must be a string' }
    },
    'Color.*': { isString: true, trim: true }
  },
  ['query']
)
