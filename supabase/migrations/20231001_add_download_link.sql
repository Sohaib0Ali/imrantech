-- Add download_link column to software_products table
ALTER TABLE public.software_products
ADD COLUMN IF NOT EXISTS download_link TEXT;

-- Add download_link column to electronics_products table
ALTER TABLE public.electronics_products
ADD COLUMN IF NOT EXISTS download_link TEXT;

-- Create an index for better query performance on download_link
CREATE INDEX IF NOT EXISTS idx_software_products_download_link ON public.software_products(download_link);
CREATE INDEX IF NOT EXISTS idx_electronics_products_download_link ON public.electronics_products(download_link);

-- Add comment to the column
COMMENT ON COLUMN public.software_products.download_link IS 'Link for downloading software files';
COMMENT ON COLUMN public.electronics_products.download_link IS 'Link for downloading electronics product files/manuals'; 