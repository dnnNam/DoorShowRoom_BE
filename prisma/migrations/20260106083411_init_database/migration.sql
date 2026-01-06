BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Admins] (
    [AdminId] INT NOT NULL IDENTITY(1,1),
    [Username] NVARCHAR(50) NOT NULL,
    [PasswordHash] NVARCHAR(255) NOT NULL,
    [FullName] NVARCHAR(100) NOT NULL,
    [Email] NVARCHAR(100) NOT NULL,
    [IsActive] BIT NOT NULL CONSTRAINT [DF_Admins_IsActive] DEFAULT 1,
    [CreatedAt] DATETIME NOT NULL CONSTRAINT [DF_Admins_CreatedAt] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Admins] PRIMARY KEY CLUSTERED ([AdminId])
);

-- CreateTable
CREATE TABLE [dbo].[Categories] (
    [CategoryId] INT NOT NULL IDENTITY(1,1),
    [CategoryName] NVARCHAR(100) NOT NULL,
    [Description] NVARCHAR(255),
    [IsActive] BIT NOT NULL CONSTRAINT [DF_Categories_IsActive] DEFAULT 1,
    CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED ([CategoryId])
);

-- CreateTable
CREATE TABLE [dbo].[Contacts] (
    [ContactId] INT NOT NULL IDENTITY(1,1),
    [FullName] NVARCHAR(100) NOT NULL,
    [Phone] NVARCHAR(20) NOT NULL,
    [Email] NVARCHAR(100) NOT NULL,
    [Message] NVARCHAR(max) CONSTRAINT [DF_Contacts_Message] DEFAULT 'getdate()',
    [CreatedAt] DATETIME NOT NULL,
    CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED ([ContactId])
);

-- CreateTable
CREATE TABLE [dbo].[ProductImages] (
    [ImageId] INT NOT NULL IDENTITY(1,1),
    [ProductId] INT NOT NULL,
    [ImageUrl] NVARCHAR(255) NOT NULL,
    [IsPrimary] BIT NOT NULL CONSTRAINT [DF_ProductImages_IsPrimary] DEFAULT 0,
    CONSTRAINT [PK_ProductImages] PRIMARY KEY CLUSTERED ([ImageId])
);

-- CreateTable
CREATE TABLE [dbo].[Products] (
    [ProductId] INT NOT NULL IDENTITY(1,1),
    [ProductName] NVARCHAR(150) NOT NULL,
    [CategoryId] INT NOT NULL,
    [Price] DECIMAL(18,2) NOT NULL,
    [Material] NVARCHAR(100) NOT NULL,
    [Color] NVARCHAR(50) NOT NULL,
    [Size] NVARCHAR(50) NOT NULL,
    [Description] NVARCHAR(max),
    [IsFeatured] BIT NOT NULL CONSTRAINT [DF_Products_IsFeatured] DEFAULT 0,
    [IsActive] BIT NOT NULL CONSTRAINT [DF_Products_IsActive] DEFAULT 1,
    [CreatedAt] DATETIME NOT NULL CONSTRAINT [DF_Products_CreatedAt] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED ([ProductId])
);

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B61459AD513] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- AddForeignKey
ALTER TABLE [dbo].[Products] ADD CONSTRAINT [FK_Products_Categories] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories]([CategoryId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
