BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Products] ADD [IsBestSeller] BIT NOT NULL CONSTRAINT [Products_IsBestSeller_df] DEFAULT 0;

-- AddForeignKey
ALTER TABLE [dbo].[ProductImages] ADD CONSTRAINT [ProductImages_ProductId_fkey] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products]([ProductId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
