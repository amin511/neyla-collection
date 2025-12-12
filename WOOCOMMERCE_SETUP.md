# WooCommerce Integration Setup

## Environment Variables

You need to add the following environment variables to your Vercel project:

1. **WOOCOMMERCE_STORE_URL** - Your WooCommerce store URL
   - Example: `https://naalas-brand.com`

2. **WOOCOMMERCE_CONSUMER_KEY** - Your WooCommerce REST API Consumer Key
   - Generated in WooCommerce Admin: Settings → Advanced → REST API

3. **WOOCOMMERCE_CONSUMER_SECRET** - Your WooCommerce REST API Consumer Secret
   - Generated in WooCommerce Admin: Settings → Advanced → REST API

## How to Get Your WooCommerce API Credentials

1. Log in to your WooCommerce admin dashboard
2. Go to **Settings** → **Advanced** → **REST API**
3. Click **Create an API key**
4. Set:
   - **Description**: E-commerce Website (or any name)
   - **User**: Select your admin user
   - **Permissions**: Choose "Read" for basic product viewing
5. Copy the **Consumer Key** and **Consumer Secret**
6. Add these to your Vercel project environment variables

## Adding Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its corresponding value
4. Click **Save**
5. Redeploy your project

## Testing the Connection

After adding the environment variables, redeploy your project. The products should now load from your WooCommerce store instead of showing mock data.

If you see an error, check:
- Credentials are copied correctly
- Store URL is correct (with https://)
- REST API is enabled in WooCommerce
- The API user has "Read" permissions for products
