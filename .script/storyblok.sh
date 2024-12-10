
#!/bin/bash
# 
# Permissions
# chmod +x .script/storyblok.sh

# Load environment variables from .env.local
export $(cat .env.local | xargs)

# Ensure STORYBLOK_SPACE_ID is set
if [ -z "$STORYBLOK_SPACE_ID" ]; then
  echo "STORYBLOK_SPACE_ID is not set in .env.local"
  exit 1
fi

# Pull components from Storyblok and save them to a JSON file
echo "Pulling Storyblok components for space ID: $STORYBLOK_SPACE_ID"
npx storyblok pull-components --space $STORYBLOK_SPACE_ID --file-name schema --path typings/

# Check if the components.schema.json file was created successfully
if [ ! -f "typings/components.schema.json" ]; then
  echo "Failed to pull Storyblok components. components.schema.json not found."
  exit 1
fi

# Generate TypeScript types from the pulled components JSON file
echo "Generating TypeScript types from components.schema.json"

# Specify your desired paths for source and destination files
SOURCE_FILE_PATHS="typings/components.schema.json"
DESTINATION_FILE_PATH="typings/storyblok.d.ts"
TYPE_NAMES_PREFIX="Resume"
TYPE_NAMES_SUFFIX="Sb"

# Run the generate-typescript-typedefs command
npx storyblok generate-typescript-typedefs \
  --sourceFilePaths $SOURCE_FILE_PATHS \
  --destinationFilePath $DESTINATION_FILE_PATH \
  --typeNamesPrefix $TYPE_NAMES_PREFIX \
  --typeNamesSuffix $TYPE_NAMES_SUFFIX

echo "TypeScript types generated successfully!"
