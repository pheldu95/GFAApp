USE [master]
GO
/****** Object:  Database [GrantsburgAssociates]    Script Date: 7/23/2020 7:22:38 AM ******/
DROP DATABASE IF EXISTS GrantsburgAssociates
GO

CREATE DATABASE [GrantsburgAssociates]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GrantsburgAssociates', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL14.CEPMSI\MSSQL\DATA\GrantsburgAssociates.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GrantsburgAssociates_log', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL14.CEPMSI\MSSQL\DATA\GrantsburgAssociates_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [GrantsburgAssociates] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GrantsburgAssociates].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GrantsburgAssociates] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET ARITHABORT OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GrantsburgAssociates] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GrantsburgAssociates] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GrantsburgAssociates] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GrantsburgAssociates] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [GrantsburgAssociates] SET  MULTI_USER 
GO
ALTER DATABASE [GrantsburgAssociates] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GrantsburgAssociates] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GrantsburgAssociates] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GrantsburgAssociates] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GrantsburgAssociates] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [GrantsburgAssociates] SET QUERY_STORE = OFF
GO
USE [GrantsburgAssociates]
GO
/****** Object:  Table [dbo].[FishCaught]    Script Date: 7/23/2020 7:22:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FishCaught](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FisherId] [int] NOT NULL,
	[GuideId] [int] NULL,
	[OrganizationId] [int] NULL,
	[FishTypeId] [int] NULL,
	[ExceptionalCatch] [bit] NULL,
	[UnusualCatch] [bit] NULL,
	[GeoPoint] [geography] NULL,
	[SkyTypeId] [int] NULL,
	[WindTypeId] [int] NULL,
	[WaterTypeId] [int] NULL,
	[MoonPhase] [nvarchar](32) NULL,
	[MoonIlluminationPercent] [int] NULL,
	[AirTemperature] [int] NULL,
	[WaterTemperature] [int] NULL,
	[CaughtDate] [datetime] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[LastModifedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_FishCaught] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FishType]    Script Date: 7/23/2020 7:22:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FishType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](64) NOT NULL,
	[WikiUrl] [nvarchar](64) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[LastModifedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_FishType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Organization]    Script Date: 7/23/2020 7:22:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organization](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](64) NOT NULL,
	[Url] [nvarchar](64) NOT NULL,
	[Street] [nvarchar](64) NOT NULL,
	[City] [nvarchar](64) NOT NULL,
	[State] [char](2) NOT NULL,
	[PostalCode] [nvarchar](32) NOT NULL,
	[Phone] [nvarchar](16) NULL,
	[MobilePhone] [nvarchar](16) NULL,
	[ExceptionalCatchNickname] [nvarchar](32) NOT NULL,
	[SoftDelete] [bit] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[LastModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Organization] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationRolePerson]    Script Date: 7/23/2020 7:22:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationRolePerson](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrganizationId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[PersonId] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[LastModifedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_OrganizationRolePerson] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Person]    Script Date: 7/23/2020 7:22:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Person](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](32) NOT NULL,
	[LastName] [nvarchar](32) NOT NULL,
	[Street] [nvarchar](64) NOT NULL,
	[Email] [nvarchar](128) NOT NULL,
	[City] [nvarchar](64) NOT NULL,
	[State] [char](2) NOT NULL,
	[PostalCode] [nvarchar](32) NOT NULL,
	[Phone] [nvarchar](16) NULL,
	[MobilePhone] [nvarchar](16) NULL,
	[ContactViaEmail] [bit] NOT NULL,
	[ContactViaPhoneCall] [bit] NOT NULL,
	[ContactViaText] [bit] NOT NULL,
	[SoftDelete] [bit] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[LastModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Person] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 7/23/2020 7:22:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](32) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[LastModifedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SkyType]    Script Date: 7/23/2020 7:22:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SkyType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](32) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[LastModifedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_SkyType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WaterType]    Script Date: 7/23/2020 7:22:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WaterType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](32) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[LastModifedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_WaterType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WindType]    Script Date: 7/23/2020 7:22:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WindType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](32) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[LastModifedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_WindType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Organization] ADD  DEFAULT ((0)) FOR [SoftDelete]
GO
ALTER TABLE [dbo].[Person] ADD  DEFAULT ((0)) FOR [ContactViaEmail]
GO
ALTER TABLE [dbo].[Person] ADD  DEFAULT ((0)) FOR [ContactViaPhoneCall]
GO
ALTER TABLE [dbo].[Person] ADD  DEFAULT ((1)) FOR [ContactViaText]
GO
ALTER TABLE [dbo].[Person] ADD  DEFAULT ((0)) FOR [SoftDelete]
GO
ALTER TABLE [dbo].[FishCaught]  WITH CHECK ADD  CONSTRAINT [FK_FishCaught_FishCaught] FOREIGN KEY([Id])
REFERENCES [dbo].[FishCaught] ([Id])
GO
ALTER TABLE [dbo].[FishCaught] CHECK CONSTRAINT [FK_FishCaught_FishCaught]
GO
ALTER TABLE [dbo].[FishCaught]  WITH CHECK ADD  CONSTRAINT [FK_FishCaught_FishType] FOREIGN KEY([FishTypeId])
REFERENCES [dbo].[FishType] ([Id])
GO
ALTER TABLE [dbo].[FishCaught] CHECK CONSTRAINT [FK_FishCaught_FishType]
GO
ALTER TABLE [dbo].[FishCaught]  WITH CHECK ADD  CONSTRAINT [FK_FishCaught_Organization] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organization] ([Id])
GO
ALTER TABLE [dbo].[FishCaught] CHECK CONSTRAINT [FK_FishCaught_Organization]
GO
ALTER TABLE [dbo].[FishCaught]  WITH CHECK ADD  CONSTRAINT [FK_FishCaught_Person] FOREIGN KEY([FisherId])
REFERENCES [dbo].[Person] ([Id])
GO
ALTER TABLE [dbo].[FishCaught] CHECK CONSTRAINT [FK_FishCaught_Person]
GO
ALTER TABLE [dbo].[FishCaught]  WITH CHECK ADD  CONSTRAINT [FK_FishCaught_Person1] FOREIGN KEY([GuideId])
REFERENCES [dbo].[Person] ([Id])
GO
ALTER TABLE [dbo].[FishCaught] CHECK CONSTRAINT [FK_FishCaught_Person1]
GO
ALTER TABLE [dbo].[FishCaught]  WITH CHECK ADD  CONSTRAINT [FK_FishCaught_SkyType] FOREIGN KEY([SkyTypeId])
REFERENCES [dbo].[SkyType] ([Id])
GO
ALTER TABLE [dbo].[FishCaught] CHECK CONSTRAINT [FK_FishCaught_SkyType]
GO
ALTER TABLE [dbo].[FishCaught]  WITH CHECK ADD  CONSTRAINT [FK_FishCaught_WaterType] FOREIGN KEY([WaterTypeId])
REFERENCES [dbo].[WaterType] ([Id])
GO
ALTER TABLE [dbo].[FishCaught] CHECK CONSTRAINT [FK_FishCaught_WaterType]
GO
ALTER TABLE [dbo].[FishCaught]  WITH CHECK ADD  CONSTRAINT [FK_FishCaught_WindType] FOREIGN KEY([WindTypeId])
REFERENCES [dbo].[WindType] ([Id])
GO
ALTER TABLE [dbo].[FishCaught] CHECK CONSTRAINT [FK_FishCaught_WindType]
GO
ALTER TABLE [dbo].[OrganizationRolePerson]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationRolePerson_Organization] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organization] ([Id])
GO
ALTER TABLE [dbo].[OrganizationRolePerson] CHECK CONSTRAINT [FK_OrganizationRolePerson_Organization]
GO
ALTER TABLE [dbo].[OrganizationRolePerson]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationRolePerson_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
GO
ALTER TABLE [dbo].[OrganizationRolePerson] CHECK CONSTRAINT [FK_OrganizationRolePerson_Person]
GO
ALTER TABLE [dbo].[OrganizationRolePerson]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationRolePerson_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([Id])
GO
ALTER TABLE [dbo].[OrganizationRolePerson] CHECK CONSTRAINT [FK_OrganizationRolePerson_Role]
GO
USE [master]
GO
ALTER DATABASE [GrantsburgAssociates] SET  READ_WRITE 
GO
