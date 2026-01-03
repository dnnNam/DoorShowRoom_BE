// file này chứa hàm xử lí lỗi của toàn bộ hệ thống

import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import logger from '~/utils/logger'

export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR
  if (statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    logger.error({
      message: error.message,
      statusCode,
      method: req.method,
      url: req.originalUrl,
      stack: error.stack
    })
  }
  res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(error, ['status']))
}
