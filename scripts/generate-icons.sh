#!/bin/bash

# Script per generare file .icns per macOS dalle immagini PNG

# Colori
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 Generazione icone .icns per AnimeWeek${NC}"

# Directory
SRC_DIR="../src/image"
BUILD_DIR="../build"
ICON_SET_DIR="AppIcon.iconset"

# Array con i nomi dei temi
declare -a themes=("orange" "pink" "ocean" "cream" "purple" "gold")

# Funzione per creare .icns da PNG
create_icns() {
    local input_file=$1
    local output_name=$2
    
    echo -e "${GREEN}📦 Creazione ${output_name}.icns...${NC}"
    
    # Crea directory temporanea per iconset
    mkdir -p "$ICON_SET_DIR"
    
    # Genera tutte le dimensioni richieste per macOS
    sips -z 16 16     "$input_file" --out "${ICON_SET_DIR}/icon_16x16.png" > /dev/null 2>&1
    sips -z 32 32     "$input_file" --out "${ICON_SET_DIR}/icon_16x16@2x.png" > /dev/null 2>&1
    sips -z 32 32     "$input_file" --out "${ICON_SET_DIR}/icon_32x32.png" > /dev/null 2>&1
    sips -z 64 64     "$input_file" --out "${ICON_SET_DIR}/icon_32x32@2x.png" > /dev/null 2>&1
    sips -z 128 128   "$input_file" --out "${ICON_SET_DIR}/icon_128x128.png" > /dev/null 2>&1
    sips -z 256 256   "$input_file" --out "${ICON_SET_DIR}/icon_128x128@2x.png" > /dev/null 2>&1
    sips -z 256 256   "$input_file" --out "${ICON_SET_DIR}/icon_256x256.png" > /dev/null 2>&1
    sips -z 512 512   "$input_file" --out "${ICON_SET_DIR}/icon_256x256@2x.png" > /dev/null 2>&1
    sips -z 512 512   "$input_file" --out "${ICON_SET_DIR}/icon_512x512.png" > /dev/null 2>&1
    sips -z 1024 1024 "$input_file" --out "${ICON_SET_DIR}/icon_512x512@2x.png" > /dev/null 2>&1
    
    # Converti in .icns
    iconutil -c icns "$ICON_SET_DIR" -o "${BUILD_DIR}/${output_name}.icns"
    
    # Pulisci
    rm -rf "$ICON_SET_DIR"
    
    echo -e "${GREEN}✅ ${output_name}.icns creato!${NC}"
}

# Naviga alla directory dello script
cd "$(dirname "$0")"

# Crea l'icona principale (orange) come default
create_icns "${SRC_DIR}/orange.png" "icon"

# Opzionalmente, crea anche icone per tutti i temi
# Decommentare le righe seguenti per creare .icns per ogni tema
# for theme in "${themes[@]}"
# do
#     create_icns "${SRC_DIR}/${theme}.png" "icon-${theme}"
# done

echo -e "${BLUE}🎉 Completato! Icone generate in ${BUILD_DIR}${NC}"
