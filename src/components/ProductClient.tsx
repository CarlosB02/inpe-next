'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Star, Truck, RotateCcw, Headphones, ChevronDown, ChevronUp,
  Clock, ShieldCheck, Check, ShoppingBag, Ruler, Heart,
  Sparkles, Smile, Footprints, Info, ChevronLeft, ChevronRight,
  ArrowRight, Sprout, Maximize, Activity, Zap, Feather
} from 'lucide-react';
import { Product, ProductVariant } from '../types/shopify';
import { useCart } from '../context/CartContext';
import Layout from './Layout';
import ProductCard from './ProductCard';
import { getColorStyle, normalizeColorName } from '../lib/colors';

// Brand & Model specific size tables matching size guide
const tablesData = [
  {
    id: 'igor-galochas',
    brand: 'Igor',
    model: 'Galochas',
    data: [
      { size: '20', length: '12,9', width: '5,8' },
      { size: '21', length: '13,5', width: '6,0' },
      { size: '22', length: '14,2', width: '6,2' },
      { size: '23', length: '14,9', width: '6,3' },
      { size: '24', length: '15,5', width: '6,4' },
      { size: '25', length: '16,1', width: '6,5' },
      { size: '26', length: '16,8', width: '6,7' },
      { size: '27', length: '17,5', width: '6,9' },
      { size: '28', length: '18,1', width: '7,0' },
      { size: '29', length: '18,8', width: '7,2' },
      { size: '30', length: '19,5', width: '7,4' },
      { size: '31', length: '20,1', width: '7,5' },
      { size: '32', length: '20,7', width: '7,6' },
      { size: '33', length: '21,3', width: '8,1' },
      { size: '34', length: '22,0', width: '8,3' },
      { size: '35', length: '22,6', width: '8,4' },
    ]
  },
  {
    id: 'igor-lonas',
    brand: 'Igor',
    model: 'Lonas',
    data: [
      { size: '20', length: '13,1', width: '6,0' },
      { size: '21', length: '13,8', width: '6,1' },
      { size: '22', length: '14,4', width: '6,2' },
      { size: '23', length: '15,0', width: '6,4' },
      { size: '24', length: '15,7', width: '6,5' },
      { size: '25', length: '16,4', width: '6,7' },
      { size: '26', length: '17,0', width: '6,9' },
      { size: '27', length: '17,5', width: '7,2' },
      { size: '28', length: '18,1', width: '7,3' },
      { size: '29', length: '18,8', width: '7,4' },
      { size: '30', length: '19,4', width: '7,6' },
    ]
  },
  {
    id: 'igor-nemo',
    brand: 'Igor',
    model: 'Nemo',
    data: [
      { size: '20', length: '12,5', width: '5,9' },
      { size: '21', length: '13,1', width: '6,0' },
      { size: '22', length: '13,7', width: '6,1' },
      { size: '23', length: '14,3', width: '6,2' },
      { size: '24', length: '15,0', width: '6,3' },
      { size: '25', length: '15,7', width: '6,4' },
      { size: '26', length: '16,3', width: '6,6' },
      { size: '27', length: '16,9', width: '6,8' },
      { size: '28', length: '17,6', width: '6,9' },
      { size: '29', length: '18,2', width: '7,0' },
      { size: '30', length: '18,9', width: '7,1' },
      { size: '31', length: '19,6', width: '7,2' },
      { size: '32', length: '20,2', width: '7,4' },
    ]
  },
  {
    id: 'blanditos-modelo-1',
    brand: 'Blanditos',
    model: 'Vénus, Crono, Ares',
    data: [
      { size: '24', length: '15,8', width: '6,7' },
      { size: '25', length: '16,5', width: '6,8' },
      { size: '26', length: '17,2', width: '6,9' },
      { size: '27', length: '17,8', width: '7,1' },
      { size: '28', length: '18,5', width: '7,3' },
      { size: '29', length: '19,1', width: '7,4' },
      { size: '30', length: '19,8', width: '7,6' },
      { size: '31', length: '20,5', width: '7,8' },
      { size: '32', length: '21,1', width: '8,0' },
      { size: '33', length: '21,8', width: '8,1' },
      { size: '34', length: '22,5', width: '8,2' },
      { size: '35', length: '23,3', width: '8,5' },
      { size: '36', length: '23,9', width: '8,6' },
      { size: '37', length: '24,6', width: '8,8' },
      { size: '38', length: '25,0', width: '8,8' },
      { size: '39', length: '25,9', width: '9,0' },
      { size: '40', length: '26,5', width: '9,2' },
    ]
  },
  {
    id: 'blanditos-modelo-2',
    brand: 'Blanditos',
    model: 'Londres, Milán, Módena',
    data: [
      { size: '19', length: '12,1', width: '5,7' },
      { size: '20', length: '12,7', width: '5,8' },
      { size: '21', length: '13,3', width: '5,9' },
      { size: '22', length: '14,0', width: '6,1' },
      { size: '23', length: '14,6', width: '6,2' },
      { size: '24', length: '15,3', width: '6,4' },
      { size: '25', length: '16,0', width: '6,5' },
      { size: '26', length: '16,5', width: '6,7' },
    ]
  },
  {
    id: 'blanditos-modelo-3',
    brand: 'Blanditos',
    model: 'Rio, Marea, Berlim',
    data: [
      { size: '26', length: '16,7', width: '6,8' },
      { size: '27', length: '17,3', width: '6,9' },
      { size: '28', length: '17,9', width: '7,1' },
      { size: '29', length: '18,7', width: '7,3' },
      { size: '30', length: '19,3', width: '7,5' },
      { size: '31', length: '20,0', width: '7,6' },
      { size: '32', length: '20,7', width: '7,8' },
      { size: '33', length: '21,5', width: '8,0' },
      { size: '34', length: '22,1', width: '8,1' },
      { size: '35', length: '22,8', width: '8,2' },
      { size: '36', length: '23,4', width: '8,5' },
      { size: '37', length: '24,0', width: '8,6' },
      { size: '38', length: '24,6', width: '8,8' },
      { size: '39', length: '25,2', width: '8,9' },
      { size: '40', length: '25,9', width: '9,1' },
    ]
  },
  {
    id: 'blanditos-modelo-4',
    brand: 'Blanditos',
    model: 'Coco, Sandía, Fresa, Guinda, Mango',
    data: [
      { size: '20', length: '13,1', width: '5,8' },
      { size: '21', length: '13,7', width: '6,0' },
      { size: '22', length: '14,5', width: '6,1' },
      { size: '23', length: '15,0', width: '6,2' },
      { size: '24', length: '15,8', width: '6,4' },
      { size: '25', length: '16,3', width: '6,5' },
      { size: '26', length: '17,0', width: '6,7' },
      { size: '27', length: '17,6', width: '6,8' },
      { size: '28', length: '18,2', width: '7,0' },
      { size: '29', length: '18,9', width: '7,2' },
    ]
  }
];

interface ProductClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ product, relatedProducts }) => {
  const { addItem, addItems, openCart } = useCart();
  const variants = useMemo(() => product.variants.edges.map(e => e.node), [product.variants]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    variants.find(v => v.availableForSale) || variants[0]
  );

  const images = useMemo(() => product.images.edges.map(e => e.node), [product.images]);
  const [selectedImage, setSelectedImage] = useState(
    selectedVariant?.image?.url || images[0]?.url || ''
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<number | null>(0);
  const [bottomTab, setBottomTab] = useState<'reviews' | 'faq'>('reviews');
  const [adding, setAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Diagnostic states for foot-measuring tool
  const [footLength, setFootLength] = useState<string>('');
  const [diagnosticResult, setDiagnosticResult] = useState<string>('');

  // Bundle section states
  const [bundleSelections, setBundleSelections] = useState<boolean[]>([true, true, true]);
  const [relatedVariant1, setRelatedVariant1] = useState<ProductVariant | null>(null);
  const [relatedVariant2, setRelatedVariant2] = useState<ProductVariant | null>(null);
  const [bundleAdding, setBundleAdding] = useState(false);

  useEffect(() => {
    if (relatedProducts && relatedProducts.length > 0) {
      const p1 = relatedProducts[0];
      const vars1 = p1.variants.edges.map(e => e.node);
      const available1 = vars1.find(v => v.availableForSale) || vars1[0] || null;
      setRelatedVariant1(available1);
    }
    if (relatedProducts && relatedProducts.length > 1) {
      const p2 = relatedProducts[1];
      const vars2 = p2.variants.edges.map(e => e.node);
      const available2 = vars2.find(v => v.availableForSale) || vars2[0] || null;
      setRelatedVariant2(available2);
    }
  }, [relatedProducts]);

  const getProductColorInfo = (p?: Product) => {
    if (!p) return { colors: [], colorImages: {} };
    const colorSet = new Set<string>();
    const colorImages: Record<string, string> = {};
    p.variants.edges.forEach(e => {
      const v = e.node;
      const cOpt = v.selectedOptions.find(o => o.name.toLowerCase().includes('cor') || o.name.toLowerCase().includes('col'));
      if (cOpt) {
        colorSet.add(cOpt.value);
        if (v.image?.url && !colorImages[cOpt.value]) {
          colorImages[cOpt.value] = v.image.url;
        }
      }
    });
    return { colors: Array.from(colorSet), colorImages };
  };

  const mainColorInfo = useMemo(() => getProductColorInfo(product), [product]);
  const rel1ColorInfo = useMemo(() => getProductColorInfo(relatedProducts?.[0]), [relatedProducts]);
  const rel2ColorInfo = useMemo(() => getProductColorInfo(relatedProducts?.[1]), [relatedProducts]);

  const getProductSizes = (p: Product) => {
    const vars = p.variants.edges.map(e => e.node);
    const sizeOptions = new Set<string>();
    vars.forEach(v => {
      v.selectedOptions.forEach(opt => {
        if (opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size')) {
          sizeOptions.add(opt.value);
        }
      });
    });
    return Array.from(sizeOptions).sort();
  };

  const handleRelatedSizeChange = (productIdx: number, size: string) => {
    const p = relatedProducts[productIdx - 1];
    if (!p) return;
    const vars = p.variants.edges.map(e => e.node);
    const match = vars.find(v =>
      v.selectedOptions.some(opt =>
        (opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size')) && opt.value === size
      )
    );
    if (match) {
      if (productIdx === 1) {
        setRelatedVariant1(match);
      } else {
        setRelatedVariant2(match);
      }
    }
  };

  const totalBundlePrice = useMemo(() => {
    let sum = 0;
    if (bundleSelections[0] && selectedVariant) {
      sum += parseFloat(selectedVariant.price.amount);
    }
    if (bundleSelections[1] && relatedVariant1) {
      sum += parseFloat(relatedVariant1.price.amount);
    }
    if (bundleSelections[2] && relatedVariant2) {
      sum += parseFloat(relatedVariant2.price.amount);
    }
    return sum;
  }, [bundleSelections, selectedVariant, relatedVariant1, relatedVariant2]);

  const handleAddBundleToCart = async () => {
    const itemsToAdd: { merchandiseId: string; quantity: number }[] = [];
    if (bundleSelections[0] && selectedVariant) {
      itemsToAdd.push({ merchandiseId: selectedVariant.id, quantity: 1 });
    }
    if (bundleSelections[1] && relatedVariant1) {
      itemsToAdd.push({ merchandiseId: relatedVariant1.id, quantity: 1 });
    }
    if (bundleSelections[2] && relatedVariant2) {
      itemsToAdd.push({ merchandiseId: relatedVariant2.id, quantity: 1 });
    }
    if (itemsToAdd.length === 0) return;
    setBundleAdding(true);
    try {
      await addItems(itemsToAdd);
      openCart();
    } catch (err) {
      console.error('Failed to add bundle to cart:', err);
    } finally {
      setBundleAdding(false);
    }
  };

  const selectedBundleCount = bundleSelections.filter(Boolean).length;

  const selectedThumbnails = useMemo(() => {
    const list = [];
    if (bundleSelections[0] && selectedImage) {
      list.push(selectedImage);
    }
    if (bundleSelections[1] && (relatedVariant1?.image?.url || relatedProducts[0]?.images.edges[0]?.node.url)) {
      list.push(relatedVariant1?.image?.url || relatedProducts[0]?.images.edges[0]?.node.url);
    }
    if (bundleSelections[2] && (relatedVariant2?.image?.url || relatedProducts[1]?.images.edges[0]?.node.url)) {
      list.push(relatedVariant2?.image?.url || relatedProducts[1]?.images.edges[0]?.node.url);
    }
    return list;
  }, [bundleSelections, selectedImage, relatedVariant1, relatedVariant2, relatedProducts]);



  const handleMobileScroll = () => {
    if (mobileGalleryRef.current) {
      const { scrollLeft, offsetWidth } = mobileGalleryRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveImageIndex(index);
    }
  };

  const toggleTab = (index: number) => setActiveTab(activeTab === index ? null : index);

  // Option names and values mapping for Shopify variants selection
  const optionNames = useMemo(() => {
    const names = new Set<string>();
    variants.forEach(v => {
      v.selectedOptions.forEach(opt => {
        names.add(opt.name);
      });
    });

    // Ensure Color/Cor is always first
    return Array.from(names).sort((a, b) => {
      const isColorA = a.toLowerCase().includes('cor') || a.toLowerCase().includes('col');
      const isColorB = b.toLowerCase().includes('cor') || b.toLowerCase().includes('col');
      if (isColorA && !isColorB) return -1;
      if (!isColorA && isColorB) return 1;
      return 0;
    });
  }, [variants]);

  const optionValuesMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    optionNames.forEach(name => {
      const values = new Set<string>();
      variants.forEach(v => {
        const opt = v.selectedOptions.find(o => o.name === name);
        if (opt) values.add(opt.value);
      });
      map[name] = Array.from(values);
    });
    return map;
  }, [optionNames, variants]);

  const [selectedOptionsMap, setSelectedOptionsMap] = useState<Record<string, string>>(() => {
    const initialMap: Record<string, string> = {};
    if (selectedVariant) {
      selectedVariant.selectedOptions.forEach(opt => {
        initialMap[opt.name] = opt.value;
      });
    }
    return initialMap;
  });

  const displayImages = useMemo(() => {
    const colorKey = Object.keys(selectedOptionsMap).find(k => k.toLowerCase().includes('cor') || k.toLowerCase().includes('col'));
    const selectedColor = colorKey ? selectedOptionsMap[colorKey] : null;

    if (!selectedColor) return images;

    const cleanStr = (str: string) => {
      if (!str) return '';
      return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    };

    const normSelectedColor = cleanStr(selectedColor);
    const normSelectedColorAlias = cleanStr(normalizeColorName(selectedColor));

    // 1. Find all image URLs assigned to any variant of this selected color
    const colorVariantImageUrls = new Set<string>();
    variants.forEach(v => {
      const cOpt = v.selectedOptions.find(o => o.name === colorKey);
      if (cOpt && cOpt.value === selectedColor && v.image?.url) {
        colorVariantImageUrls.add(v.image.url);
      }
    });

    // 2. Find all image URLs exclusively assigned to OTHER colors' variants (not this color)
    const otherColorVariantImageUrls = new Set<string>();
    variants.forEach(v => {
      const cOpt = v.selectedOptions.find(o => o.name === colorKey);
      if (cOpt && cOpt.value !== selectedColor && v.image?.url) {
        // Only add if not also used by the selected color
        if (!colorVariantImageUrls.has(v.image.url)) {
          otherColorVariantImageUrls.add(v.image.url);
        }
      }
    });

    // 3. Find all other colors of this product
    const allColors = colorKey ? (optionValuesMap[colorKey] || []) : [];
    const otherColorsClean = allColors
      .filter(c => c !== selectedColor)
      .map(c => cleanStr(c))
      .filter(c => c.length > 0 && c !== normSelectedColor && c !== normSelectedColorAlias);

    // 4. Filter images: include if:
    //    a) Directly assigned to a variant of this color, OR
    //    b) altText explicitly matches this color (and not another), OR
    //    c) No altText AND not exclusively assigned to another color's variant
    const matchedImages = images.filter(img => {
      // Check if image is directly assigned to a variant of this color
      if (colorVariantImageUrls.has(img.url)) {
        return true;
      }

      // If no altText: include unless it belongs exclusively to another color's variant
      if (!img.altText) {
        return !otherColorVariantImageUrls.has(img.url);
      }

      const normAlt = cleanStr(img.altText);
      const normAltAlias = cleanStr(normalizeColorName(img.altText));

      // Check if altText matches selected color name or alias
      const matchesSelected =
        normAlt.includes(normSelectedColor) ||
        (normSelectedColorAlias && normAlt.includes(normSelectedColorAlias)) ||
        normAltAlias.includes(normSelectedColor) ||
        (normSelectedColorAlias && normAltAlias.includes(normSelectedColorAlias));

      // Check if altText exclusively matches another color
      const matchesOther = otherColorsClean.some(other => {
        if (other.length < 3) return false;
        if (normSelectedColor.includes(other) || normSelectedColorAlias.includes(other)) return false;
        return normAlt.includes(other) || normAltAlias.includes(other);
      });

      if (matchesOther && !matchesSelected) return false;

      return matchesSelected || !matchesOther;
    });

    if (matchedImages.length > 0) return matchedImages;

    // Fallback: If no altText matches, return images that don't belong to other colors
    const nonOtherImages = images.filter(img => {
      if (colorVariantImageUrls.has(img.url)) return true;
      if (!img.altText) return true;
      const normAlt = cleanStr(img.altText);
      const normAltAlias = cleanStr(normalizeColorName(img.altText));
      return !otherColorsClean.some(other => {
        if (other.length < 3) return false;
        if (normSelectedColor.includes(other) || normSelectedColorAlias.includes(other)) return false;
        return normAlt.includes(other) || normAltAlias.includes(other);
      });
    });

    return nonOtherImages.length > 0 ? nonOtherImages : images;
  }, [images, selectedOptionsMap, optionValuesMap, variants]);

  // Sync image when color/displayImages changes
  useEffect(() => {
    if (displayImages.length === 0) return;
    // If current selectedImage is not in the filtered displayImages, jump to first of new color set
    const currentIsInDisplay = displayImages.some(img => img.url === selectedImage);
    if (!currentIsInDisplay) {
      setSelectedImage(displayImages[0].url);
    }
  }, [displayImages]);

  const handleOptionChange = (optionName: string, optionValue: string) => {
    const updatedMap = { ...selectedOptionsMap, [optionName]: optionValue };

    // 1. Try to find variant with exact match
    let match = variants.find(v =>
      v.selectedOptions.every(opt => updatedMap[opt.name] === opt.value)
    );

    // 2. If no exact match (e.g. that color is not available in that size),
    // find first variant that has the selected color/option, and use its options
    if (!match) {
      match = variants.find(v =>
        v.selectedOptions.some(opt => opt.name === optionName && opt.value === optionValue)
      );
    }

    if (match) {
      setSelectedVariant(match);
      const newMap: Record<string, string> = {};
      match.selectedOptions.forEach(opt => {
        newMap[opt.name] = opt.value;
      });
      setSelectedOptionsMap(newMap);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    setAdding(true);
    try {
      await addItem(selectedVariant.id, quantity);
      openCart();
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    setAdding(true);
    try {
      await addItem(selectedVariant.id, quantity);
      openCart();
    } catch (err) {
      console.error('Failed to add for checkout:', err);
    } finally {
      setAdding(false);
    }
  };

  // Match product tags to a size table
  const matchedTableId = useMemo(() => {
    if (!product || !product.tags) return null;
    const normalizedTags = product.tags.map(t => t.toLowerCase().trim().replace(/\s+/g, '-'));
    
    if (normalizedTags.includes('igor-galochas') || normalizedTags.includes('igor-galocha')) {
      return 'igor-galochas';
    }
    if (normalizedTags.includes('igor-lonas') || normalizedTags.includes('igor-lona')) {
      return 'igor-lonas';
    }
    if (normalizedTags.includes('igor-nemo')) {
      return 'igor-nemo';
    }
    if (normalizedTags.includes('blanditos-modelo-1') || normalizedTags.includes('venus') || normalizedTags.includes('crono') || normalizedTags.includes('ares') || normalizedTags.includes('blanditos-venus-crono-ares')) {
      return 'blanditos-modelo-1';
    }
    if (normalizedTags.includes('blanditos-modelo-2') || normalizedTags.includes('londres') || normalizedTags.includes('milan') || normalizedTags.includes('modena') || normalizedTags.includes('blanditos-londres-milan-modena')) {
      return 'blanditos-modelo-2';
    }
    if (normalizedTags.includes('blanditos-modelo-3') || normalizedTags.includes('rio') || normalizedTags.includes('marea') || normalizedTags.includes('berlim') || normalizedTags.includes('blanditos-rio-marea-berlim')) {
      return 'blanditos-modelo-3';
    }
    if (normalizedTags.includes('blanditos-modelo-4') || normalizedTags.includes('coco') || normalizedTags.includes('sandia') || normalizedTags.includes('fresa') || normalizedTags.includes('guinda') || normalizedTags.includes('mango') || normalizedTags.includes('blanditos-coco-sandia-fresa-guinda-mango')) {
      return 'blanditos-modelo-4';
    }
    
    return null;
  }, [product]);

  const matchedTable = useMemo(() => {
    if (!matchedTableId) return null;
    return tablesData.find(t => t.id === matchedTableId) || null;
  }, [matchedTableId]);

  // Diagnostic foot calculator
  const calculateSize = (val: string) => {
    setFootLength(val);
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) {
      setDiagnosticResult('');
      return;
    }

    if (matchedTable) {
      // Parse lengths to float
      const parsedData = matchedTable.data.map(item => ({
        size: item.size,
        length: parseFloat(item.length.replace(',', '.')),
        width: parseFloat(item.width.replace(',', '.'))
      }));

      // Find candidates where wiggle room is at least 0.5 cm
      const candidates = parsedData.filter(d => d.length - num >= 0.5);

      if (candidates.length === 0) {
        setDiagnosticResult(`Todos os tamanhos para **${matchedTable.brand} ${matchedTable.model.split(',')[0]}** são pequenos para a medida de ${num}cm.`);
        return;
      }

      // 1. Try to find if any size has wiggle room between 0.8 and 1.2 cm (ideal)
      let selected = null;
      const idealCandidates = candidates.filter(c => {
        const wiggle = c.length - num;
        return wiggle >= 0.8 && wiggle <= 1.2;
      });

      if (idealCandidates.length > 0) {
        // Pick the one closest to 1.0 cm wiggle
        selected = idealCandidates[0];
        let bestDiff = Math.abs((selected.length - num) - 1.0);
        for (let i = 1; i < idealCandidates.length; i++) {
          const diff = Math.abs((idealCandidates[i].length - num) - 1.0);
          if (diff < bestDiff) {
            selected = idealCandidates[i];
            bestDiff = diff;
          }
        }
      } else {
        // 2. Try to find if any size has wiggle room between 0.6 and 1.4 cm
        const goodCandidates = candidates.filter(c => {
          const wiggle = c.length - num;
          return wiggle >= 0.6 && wiggle <= 1.4;
        });

        if (goodCandidates.length > 0) {
          selected = goodCandidates[0];
          let bestDiff = Math.abs((selected.length - num) - 1.0);
          for (let i = 1; i < goodCandidates.length; i++) {
            const diff = Math.abs((goodCandidates[i].length - num) - 1.0);
            if (diff < bestDiff) {
              selected = goodCandidates[i];
              bestDiff = diff;
            }
          }
        } else {
          // 3. Just pick the candidate with the smallest absolute difference from 1.0 cm wiggle
          selected = candidates[0];
          let bestDiff = Math.abs((selected.length - num) - 1.0);
          for (let i = 1; i < candidates.length; i++) {
            const diff = Math.abs((candidates[i].length - num) - 1.0);
            if (diff < bestDiff) {
              selected = candidates[i];
              bestDiff = diff;
            }
          }
        }
      }

      if (selected) {
        const wiggle = selected.length - num;
        let recommendationText = `Recomendamos o **Tamanho ${selected.size}** para o modelo **${matchedTable.brand} ${matchedTable.model.split(',')[0]}**`;
        recommendationText += ` (Medida do pé: ${num}cm | Palmilha: ${selected.length.toFixed(1)}cm | Folga: +${wiggle.toFixed(1)}cm)`;
        setDiagnosticResult(recommendationText);
      }
    } else {
      const targetLength = num + 1.0;
      let size = '';

      if (targetLength < 11.5) size = 'Tamanho 18 (Pezinho de Bebé)';
      else if (targetLength < 12.0) size = 'Tamanho 19';
      else if (targetLength < 12.7) size = 'Tamanho 20';
      else if (targetLength < 13.4) size = 'Tamanho 21';
      else if (targetLength < 14.1) size = 'Tamanho 22';
      else if (targetLength < 14.7) size = 'Tamanho 23';
      else if (targetLength < 15.4) size = 'Tamanho 24';
      else if (targetLength < 16.0) size = 'Tamanho 25';
      else if (targetLength < 16.7) size = 'Tamanho 26';
      else if (targetLength < 17.4) size = 'Tamanho 27';
      else if (targetLength < 18.0) size = 'Tamanho 28';
      else if (targetLength < 18.7) size = 'Tamanho 29';
      else if (targetLength < 19.4) size = 'Tamanho 30';
      else if (targetLength < 20.0) size = 'Tamanho 31';
      else if (targetLength < 20.7) size = 'Tamanho 32';
      else if (targetLength < 21.4) size = 'Tamanho 33';
      else if (targetLength < 22.0) size = 'Tamanho 34';
      else size = 'Tamanho 35+ (Consultar Guia Principal)';

      setDiagnosticResult(`Recomendamos o **${size}** (Medida: ${num}cm + 1cm de folga saudável = ${targetLength.toFixed(1)}cm)`);
    }
  };

  const tabs = [
    {
      title: '🦕 Anatomia e Brincadeira', content: (
        <div style={{ padding: '0.5rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Sola plana para um alinhamento natural do corpo.',
              'Flexibilidade que acompanha cada movimento.',
              'Materiais leves e respiráveis para conforto diário.',
              'Espaço amplo para os dedos se moverem livremente.',
              'Calcanhar livre para um movimento natural.'
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.8rem', marginBottom: '0.8rem', fontSize: '0.95rem', color: '#2C3E50', fontWeight: '600' }}>
                <Check size={18} color="#4CAF50" strokeWidth={3} style={{ flexShrink: 0, marginTop: '2px' }} /> <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      title: '🍃 Materiais do Sapatinho', content: (
        <div style={{ padding: '0.5rem' }}>
          <p style={{ marginBottom: '1rem', color: '#666', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            {['Algodão Biológico', 'Respirável', 'Sola Antiderrapante', 'Feito na Península Ibérica'].map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: '#2C3E50', fontSize: '0.9rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#007396' }} /> {feat}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: '🛡️ Garantia Inpe', content: (
        <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#FFF9ED', borderRadius: '20px', border: '2px dashed #F4C466' }}>
          <ShieldCheck size={44} color="#FF9F1C" style={{ margin: '0 auto 10px' }} />
          <p style={{ color: '#2C3E50', fontWeight: '800', fontSize: '1rem' }}>Trocas e Devoluções Simplificadas</p>
          <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '5px' }}>Queremos que escolha com tranquilidade. Se necessário, pode trocar ou devolver até 30 dias.</p>
        </div>
      )
    }
  ];

  const priceVal = parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount);
  const compareAtPriceVal = selectedVariant?.compareAtPrice?.amount
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : (selectedVariant ? 0.00 : parseFloat(product.compareAtPriceRange?.minVariantPrice?.amount || '0.00'));
  const hasDiscount = compareAtPriceVal > priceVal;
  const discountPercentage = hasDiscount ? Math.round(((compareAtPriceVal - priceVal) / compareAtPriceVal) * 100) : 0;
  const currencySymbol = selectedVariant?.price.currencyCode === 'EUR' ? '€' : selectedVariant?.price.currencyCode;

  // Render thumbnail style with alternate rotations
  const getRotationStyle = (idx: number) => {
    const rotations = [-3, 2, -1, 3, -2];
    return rotations[idx % rotations.length];
  };

  return (
    <Layout>
      <div style={{ backgroundColor: 'transparent', minHeight: '100vh', padding: '3rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          {/* Main Content Grid (styled like Design 2) */}
          <div className="product-main" style={{ alignItems: 'start', marginBottom: '6rem' }}>

            {/* Left: Gallery */}
            <div className="product-gallery" style={{ height: 'fit-content', zIndex: 10 }}>
              {/* Desktop View */}
              <div className="desktop-gallery-view">
                <div className="gallery-thumbnails">
                  {displayImages.slice(0, Math.min(5, displayImages.length)).map((img, idx) => {
                    const isLast = idx === 4 && displayImages.length > 5;
                    const remaining = displayImages.length - 5;
                    return (
                      <div
                        key={idx}
                        style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}
                        onClick={() => {
                          if (isLast) {
                            setLightboxIndex(idx);
                            setLightboxOpen(true);
                          } else {
                            setSelectedImage(img.url);
                          }
                        }}
                      >
                        <img
                          src={img.url}
                          alt={img.altText || `Thumbnail ${idx}`}
                          className={`gallery-thumbnail ${selectedImage === img.url ? 'active' : ''}`}
                          style={{ display: 'block' }}
                        />
                        {isLast && (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 'inherit',
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.82) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '900',
                            fontSize: '1.25rem',
                            color: '#2C3E50',
                            letterSpacing: '-0.5px',
                            pointerEvents: 'none'
                          }}>
                            +{remaining}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="gallery-main-image">
                  <img src={selectedImage} alt={product.title} />
                </div>
              </div>

              {/* Mobile View */}
              <div className="mobile-gallery-view">
                <div className="mobile-gallery-scroll" ref={mobileGalleryRef} onScroll={handleMobileScroll}>
                  {displayImages.map((img, idx) => (
                    <img key={idx} src={img.url} alt={`Product ${idx}`} className="mobile-gallery-image" />
                  ))}
                </div>
                <div className="mobile-gallery-dots">
                  {displayImages.map((_, idx) => (
                    <span key={idx} className={`gallery-dot ${idx === activeImageIndex ? 'active' : ''}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Info and Purchase Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              <div>
                {product.vendor && (
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '800',
                    color: '#FF9F1C',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block',
                    marginBottom: '0.2rem'
                  }}>
                    {product.vendor}
                  </span>
                )}
                <h1 style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                  fontWeight: '900',
                  color: '#2C3E50',
                  marginTop: product.vendor ? '0' : '1rem',
                  lineHeight: '1.1',
                  textTransform: 'uppercase'
                }}>
                  {product.title}
                </h1>


              </div>

              {/* Price Sticker and Free Shipping */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {hasDiscount && (
                    <div style={{
                      color: '#8097a5',
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      textDecoration: 'line-through',
                      marginRight: '5px'
                    }}>
                      {compareAtPriceVal.toFixed(2)}{currencySymbol}
                    </div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    style={{
                      backgroundColor: hasDiscount ? '#D93025' : '#FF9F1C',
                      color: 'white',
                      padding: '12px 28px',
                      borderRadius: '20px 4px 20px 20px',
                      fontSize: '2.2rem',
                      fontWeight: '900',
                      boxShadow: hasDiscount 
                        ? '0 8px 20px rgba(217, 48, 37, 0.3)' 
                        : '0 8px 20px rgba(255, 159, 28, 0.3)',
                      display: 'inline-flex',
                      alignItems: 'baseline',
                      lineHeight: '1'
                    }}
                  >
                    {priceVal.toFixed(2)}
                    <span style={{ fontSize: '1.2rem', marginLeft: '4px', fontWeight: '800' }}>{currencySymbol}</span>
                  </motion.div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {hasDiscount && (
                    <div style={{
                      backgroundColor: '#FCE8E6',
                      color: '#D93025',
                      padding: '6px 12px',
                      borderRadius: '30px',
                      fontSize: '0.85rem',
                      fontWeight: '800',
                      textTransform: 'uppercase'
                    }}>
                      Poupe {discountPercentage}%
                    </div>
                  )}

                  <div style={{
                    backgroundColor: '#E8F5E9',
                    color: '#4CAF50',
                    padding: '6px 12px',
                    borderRadius: '30px',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    textTransform: 'uppercase'
                  }}>
                    Envio Grátis
                  </div>
                </div>
              </div>

              <div style={{ height: '2px', backgroundColor: 'rgba(0,0,0,0.05)' }} />

              {/* Custom options and size selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1rem' }}>
                {optionNames.map(name => {
                  const isColor = name.toLowerCase().includes('cor') || name.toLowerCase().includes('col');
                  const isSize = name.toLowerCase().includes('tam') || name.toLowerCase().includes('siz') || name.toLowerCase().includes('num');
                  const values = optionValuesMap[name];

                  // Color selector in single row
                  if (isColor || (!isSize && optionNames.indexOf(name) === 0)) {
                    return (
                      <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--color-text)' }}>
                          🎨 Escolhe a Cor / Opção: {selectedOptionsMap[name] ? <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{selectedOptionsMap[name]}</span> : null}
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {values.map(val => {
                            const isSelected = selectedOptionsMap[name] === val;
                            const styleObj = getColorStyle(val);

                            return (
                              <button
                                key={val}
                                onClick={() => handleOptionChange(name, val)}
                                title={val}
                                style={{
                                  width: '42px',
                                  height: '42px',
                                  borderRadius: '50%',
                                  border: isSelected ? '3px solid #FF9F1C' : styleObj.isWhite ? '2px solid #ddd' : '2px solid #EAEAEA',
                                  background: styleObj.background,
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                  padding: 0,
                                  boxShadow: isSelected ? '0 0 0 2px white inset, 0 4px 10px rgba(0,0,0,0.15)' : 'none',
                                  position: 'relative',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                aria-label={`Cor ${val}`}
                              >
                                {isSelected && (
                                  <Check
                                    size={18}
                                    color={styleObj.isWhite ? '#2C3E50' : 'white'}
                                    strokeWidth={3.5}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  // Size selector below colors
                  if (isSize || optionNames.indexOf(name) > 0 || values.every(v => !isNaN(parseFloat(v)))) {
                    return (
                      <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--color-text)' }}>
                            👣 Escolhe o Tamanho ideal:
                          </span>

                          <a
                            href="#calculadora-tamanhos"
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById('calculadora-tamanhos')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            style={{ fontSize: '0.85rem', color: 'var(--color-winter-blue)', fontWeight: 600, textDecoration: 'underline' }}
                          >
                            Tabela de medidas
                          </a>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {values.map(val => {
                            const sizeVariant = variants.find(v =>
                              v.selectedOptions.some(o => o.name === name && o.value === val) &&
                              (optionNames.find(n => n !== name) ? v.selectedOptions.some(o => o.name !== name && o.value === selectedOptionsMap[o.name]) : true)
                            );
                            const isAvailable = sizeVariant ? sizeVariant.availableForSale : false;
                            const isSelected = selectedOptionsMap[name] === val;

                            const vCompareAt = sizeVariant?.compareAtPrice?.amount ? parseFloat(sizeVariant.compareAtPrice.amount) : 0;
                            const vPrice = sizeVariant ? parseFloat(sizeVariant.price.amount) : 0;
                            const isPromoVariant = sizeVariant && vCompareAt > vPrice;

                            return (
                              <motion.button
                                key={val}
                                onClick={() => isAvailable && handleOptionChange(name, val)}
                                whileHover={isAvailable ? { scale: 1.12 } : {}}
                                whileTap={isAvailable ? { scale: 0.92 } : {}}
                                style={{
                                  minWidth: '54px',
                                  height: '54px',
                                  borderRadius: '50%',
                                  border: isSelected ? '3px solid #FF9F1C' : isPromoVariant ? '2px solid #D93025' : '2px solid #EAEAEA',
                                  backgroundColor: isSelected ? '#FF9F1C' : isAvailable ? 'white' : '#F5F5F5',
                                  color: isSelected ? 'white' : isAvailable ? 'var(--color-text)' : '#BBB',
                                  fontWeight: '900',
                                  fontSize: '1rem',
                                  cursor: isAvailable ? 'pointer' : 'not-allowed',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  position: 'relative',
                                  textDecoration: isAvailable ? 'none' : 'line-through'
                                }}
                              >
                                {val}
                                {isAvailable && isPromoVariant && (
                                  <span style={{
                                    position: 'absolute',
                                    top: '-4px',
                                    right: '-4px',
                                    fontSize: '0.55rem',
                                    backgroundColor: '#D93025',
                                    color: 'white',
                                    padding: '1px 4px',
                                    borderRadius: '6px',
                                    fontWeight: 'bold',
                                    lineHeight: '1',
                                    boxShadow: '0 2px 4px rgba(217, 48, 37, 0.3)'
                                  }}>
                                    -%
                                  </span>
                                )}
                                {!isAvailable && (
                                  <span style={{
                                    position: 'absolute',
                                    bottom: '-2px',
                                    fontSize: '0.55rem',
                                    backgroundColor: '#E06A55',
                                    color: 'white',
                                    padding: '1px 4px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    textDecoration: 'none'
                                  }}>
                                    Esgotado
                                  </span>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--color-text)' }}>
                        {name}:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {values.map(val => {
                          const isSelected = selectedOptionsMap[name] === val;
                          return (
                            <button
                              key={val}
                              onClick={() => handleOptionChange(name, val)}
                              style={{
                                padding: '8px 18px',
                                borderRadius: '20px',
                                border: isSelected ? '2px solid #FF9F1C' : '2px solid #EAEAEA',
                                backgroundColor: isSelected ? '#FF9F1C' : 'white',
                                color: isSelected ? 'white' : 'var(--color-text)',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                              }}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quantity Selector, Add to Cart, Buy Now */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>

                  {/* Bubbly Quantity Selector */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '2px solid #EAEAEA',
                    borderRadius: '30px',
                    padding: '4px 12px',
                    height: '56px',
                    width: '120px',
                    backgroundColor: 'white'
                  }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ background: 'none', border: 'none', fontSize: '1.4rem', fontWeight: 'bold', cursor: 'pointer', color: '#2C3E50', width: '30px' }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: '800', fontSize: '1.1rem', color: '#2C3E50' }}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ background: 'none', border: 'none', fontSize: '1.4rem', fontWeight: 'bold', cursor: 'pointer', color: '#2C3E50', width: '30px' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    disabled={adding || !selectedVariant.availableForSale}
                    style={{
                      flex: '1',
                      minWidth: '200px',
                      height: '56px',
                      borderRadius: '30px',
                      backgroundColor: '#FF9F1C',
                      color: 'white',
                      border: 'none',
                      fontWeight: '900',
                      fontSize: '1.1rem',
                      cursor: selectedVariant.availableForSale ? 'pointer' : 'not-allowed',
                      boxShadow: '0 8px 25px rgba(255, 159, 28, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      opacity: selectedVariant.availableForSale ? 1 : 0.6
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                      <ShoppingBag size={20} style={{ flexShrink: 0 }} />
                      {adding ? 'A Guardar...' : selectedVariant.availableForSale ? 'Adicionar ao Carrinho' : 'Esgotado'}
                    </span>
                  </motion.button>

                </div>

                {/* Direct Buy Now Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  disabled={adding || !selectedVariant.availableForSale}
                  style={{
                    width: '100%',
                    height: '56px',
                    borderRadius: '30px',
                    backgroundColor: '#007396',
                    color: 'white',
                    border: 'none',
                    fontWeight: '900',
                    fontSize: '1.1rem',
                    cursor: selectedVariant.availableForSale ? 'pointer' : 'not-allowed',
                    boxShadow: '0 8px 25px rgba(0, 115, 150, 0.25)',
                    opacity: selectedVariant.availableForSale ? 1 : 0.6
                  }}
                >
                  Comprar Já ✨
                </motion.button>
              </div>

              {/* Quick Size Calculator Widget */}
              <div
                id="calculadora-tamanhos"
                style={{
                  backgroundColor: '#FFF9ED',
                  border: '2px dashed #F4C466',
                  borderRadius: '24px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '1.5rem',
                  scrollMarginTop: '100px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Ruler size={20} color="#FF9F1C" />
                  <span style={{ fontWeight: '900', color: 'var(--color-text)', fontSize: '1rem' }}>
                    Calculadora de Tamanho Rápida {matchedTable ? `(${matchedTable.brand} ${matchedTable.model.split(',')[0]})` : ''}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0, lineHeight: 1.4 }}>
                  Coloca o pezinho da criança numa folha de papel, desenha o contorno e mede em centímetros de ponta a ponta.
                </p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--color-text)' }}>Medida em cm:</span>
                  <input
                    type="number"
                    step="0.1"
                    min="10"
                    max="30"
                    placeholder="Ex: 14"
                    value={footLength}
                    onChange={(e) => calculateSize(e.target.value)}
                    style={{
                      width: '90px',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      border: '2px solid #F4C466',
                      fontWeight: '800',
                      outline: 'none',
                      color: 'var(--color-text)',
                      textAlign: 'center'
                    }}
                  />
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>cm</span>
                </div>

                {diagnosticResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '10px 14px',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      borderLeft: '4px solid #FF9F1C',
                      fontSize: '0.9rem',
                      color: 'var(--color-text)',
                      fontWeight: '600'
                    }}
                  >
                    💡 <span dangerouslySetInnerHTML={{ __html: diagnosticResult.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </motion.div>
                )}
              </div>

              {/* Visual Trust Cards Layout */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '10px' }}>
                <div style={{
                  padding: '16px',
                  borderRadius: '20px',
                  backgroundColor: '#F0F7F9',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <Truck size={22} color="#007396" />
                  <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#2C3E50' }}>Entrega GRÁTIS</span>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>2 a 5 dias para Portugal e Espanha</span>
                </div>
                <div style={{
                  padding: '16px',
                  borderRadius: '20px',
                  backgroundColor: '#F9F0F4',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <RotateCcw size={22} color="#E06A55" />
                  <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#2C3E50' }}>30 Dias para devolução</span>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>Devolução simplificada e grátis</span>
                </div>
              </div>

              {/* Accordion Tabs */}
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tabs.map((tab, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '20px',
                      border: '2px solid #EAEAEA',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      onClick={() => toggleTab(idx)}
                      style={{
                        padding: '16px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: '900',
                        color: '#2C3E50',
                        fontSize: '1rem'
                      }}
                    >
                      <span>{tab.title}</span>
                      <motion.div
                        animate={{ rotate: activeTab === idx ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </div>
                    <AnimatePresence initial={false}>
                      {activeTab === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '0 20px 20px', borderTop: '1px solid #EAEAEA', paddingTop: '15px' }}>
                            {tab.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Frequently Bought Together Bundle */}
          {relatedProducts.length >= 2 && (
            <div className="bundle-section" style={{ borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '4rem' }}>

              {/* Desktop Layout */}
              <div className="bundle-section-desktop">
                <div className="section-header">
                  <span className="section-subtitle">Aproveite mais por menos</span>
                  <h2 className="section-title" style={{
                    fontSize: '2.2rem',
                    fontWeight: '900',
                    color: '#2C3E50',
                    marginTop: '0.5rem',
                    textTransform: 'uppercase'
                  }}>
                    Frequentemente comprados <span style={{ color: '#007396' }}>em conjunto</span>
                  </h2>
                </div>

                <div className="bundle-container">
                  <div className="bundle-cards">

                    {/* Card 1: Main Product */}
                    <div className={`bundle-card-wrapper ${!bundleSelections[0] ? 'deselected' : ''}`} style={{ transform: 'rotate(-1deg)', transition: 'transform 0.3s ease' }}>
                      <div
                        className={`bundle-checkbox ${bundleSelections[0] ? 'selected' : ''}`}
                        onClick={() => setBundleSelections(prev => [!prev[0], prev[1], prev[2]])}
                        style={{
                          backgroundColor: bundleSelections[0] ? '#FF9F1C' : 'white',
                          borderColor: bundleSelections[0] ? '#FF9F1C' : '#ddd',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        {bundleSelections[0] && <Check size={14} strokeWidth={3} />}
                      </div>

                      <ProductCard
                        id={product.handle}
                        title={product.title}
                        price={selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount}
                        originalPrice={selectedVariant?.compareAtPrice?.amount || product.compareAtPriceRange?.minVariantPrice?.amount}
                        image={selectedImage}
                        category={product.productType || (product.tags.find(t => t.toLowerCase() === 'crianca') ? 'Crianças' : 'Sapatinhos')}
                        images={product.images.edges.map(e => ({ url: e.node.url, altText: e.node.altText }))}
                        colors={mainColorInfo.colors}
                        colorImages={mainColorInfo.colorImages}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#666' }}>
                          Tamanho: {selectedOptionsMap[Object.keys(selectedOptionsMap).find(k => k.toLowerCase().includes('tamanho') || k.toLowerCase().includes('size')) || ''] || 'Padrão'}
                        </div>
                      </ProductCard>
                    </div>

                    <div className="plus-sign">+</div>

                    {/* Card 2: Related Product 1 */}
                    <div className={`bundle-card-wrapper ${!bundleSelections[1] ? 'deselected' : ''}`} style={{ transform: 'rotate(1.5deg)', transition: 'transform 0.3s ease' }}>
                      <div
                        className={`bundle-checkbox ${bundleSelections[1] ? 'selected' : ''}`}
                        onClick={() => setBundleSelections(prev => [prev[0], !prev[1], prev[2]])}
                        style={{
                          backgroundColor: bundleSelections[1] ? '#FF9F1C' : 'white',
                          borderColor: bundleSelections[1] ? '#FF9F1C' : '#ddd',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        {bundleSelections[1] && <Check size={14} strokeWidth={3} />}
                      </div>

                      <ProductCard
                        id={relatedProducts[0].handle}
                        title={relatedProducts[0].title}
                        price={relatedVariant1?.price.amount || relatedProducts[0].priceRange.minVariantPrice.amount}
                        originalPrice={relatedVariant1?.compareAtPrice?.amount || relatedProducts[0].compareAtPriceRange?.minVariantPrice?.amount}
                        image={relatedVariant1?.image?.url || relatedProducts[0].images.edges[0]?.node.url}
                        category={relatedProducts[0].productType || (relatedProducts[0].tags.find(t => t.toLowerCase() === 'crianca') ? 'Crianças' : 'Sapatinhos')}
                        images={relatedProducts[0].images.edges.map(e => ({ url: e.node.url, altText: e.node.altText }))}
                        colors={rel1ColorInfo.colors}
                        colorImages={rel1ColorInfo.colorImages}
                      >
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#666', display: 'block', marginBottom: '4px' }}>Tamanho:</span>
                          <select
                            value={relatedVariant1?.selectedOptions.find(opt => opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size'))?.value || ''}
                            onChange={(e) => handleRelatedSizeChange(1, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              borderRadius: '10px',
                              border: '2px solid #EAEAEA',
                              fontSize: '0.85rem',
                              fontWeight: '800',
                              color: 'var(--color-text)',
                              outline: 'none',
                              backgroundColor: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            {getProductSizes(relatedProducts[0]).map(sz => (
                              <option key={sz} value={sz}>{sz}</option>
                            ))}
                          </select>
                        </div>
                      </ProductCard>
                    </div>

                    <div className="plus-sign">+</div>

                    {/* Card 3: Related Product 2 */}
                    <div className={`bundle-card-wrapper ${!bundleSelections[2] ? 'deselected' : ''}`} style={{ transform: 'rotate(-0.5deg)', transition: 'transform 0.3s ease' }}>
                      <div
                        className={`bundle-checkbox ${bundleSelections[2] ? 'selected' : ''}`}
                        onClick={() => setBundleSelections(prev => [prev[0], prev[1], !prev[2]])}
                        style={{
                          backgroundColor: bundleSelections[2] ? '#FF9F1C' : 'white',
                          borderColor: bundleSelections[2] ? '#FF9F1C' : '#ddd',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        {bundleSelections[2] && <Check size={14} strokeWidth={3} />}
                      </div>

                      <ProductCard
                        id={relatedProducts[1].handle}
                        title={relatedProducts[1].title}
                        price={relatedVariant2?.price.amount || relatedProducts[1].priceRange.minVariantPrice.amount}
                        originalPrice={relatedVariant2?.compareAtPrice?.amount || relatedProducts[1].compareAtPriceRange?.minVariantPrice?.amount}
                        image={relatedVariant2?.image?.url || relatedProducts[1].images.edges[0]?.node.url}
                        category={relatedProducts[1].productType || (relatedProducts[1].tags.find(t => t.toLowerCase() === 'crianca') ? 'Crianças' : 'Sapatinhos')}
                        images={relatedProducts[1].images.edges.map(e => ({ url: e.node.url, altText: e.node.altText }))}
                        colors={rel2ColorInfo.colors}
                        colorImages={rel2ColorInfo.colorImages}
                      >
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#666', display: 'block', marginBottom: '4px' }}>Tamanho:</span>
                          <select
                            value={relatedVariant2?.selectedOptions.find(opt => opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size'))?.value || ''}
                            onChange={(e) => handleRelatedSizeChange(2, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              borderRadius: '10px',
                              border: '2px solid #EAEAEA',
                              fontSize: '0.85rem',
                              fontWeight: '800',
                              color: 'var(--color-text)',
                              outline: 'none',
                              backgroundColor: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            {getProductSizes(relatedProducts[1]).map(sz => (
                              <option key={sz} value={sz}>{sz}</option>
                            ))}
                          </select>
                        </div>
                      </ProductCard>
                    </div>

                  </div>

                  {/* Sidebar Summary */}
                  <div className="bundle-summary" style={{
                    border: '2px solid #EAEAEA',
                    borderRadius: '24px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.02)'
                  }}>
                    <div className="bundle-total-price">
                      <span className="label" style={{ fontSize: '0.9rem', fontWeight: '900', color: '#8097a5', letterSpacing: '1px' }}>Preço Total:</span>
                      <span className="value" style={{ fontSize: '2.4rem', fontWeight: '900', color: '#2C3E50', marginTop: '5px' }}>
                        {totalBundlePrice.toFixed(2)} €
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleAddBundleToCart}
                        disabled={bundleAdding || selectedBundleCount === 0}
                        style={{
                          width: '100%',
                          height: '48px',
                          borderRadius: '24px',
                          backgroundColor: '#F4C466',
                          color: '#2C3E50',
                          border: 'none',
                          fontWeight: '900',
                          fontSize: '0.95rem',
                          cursor: selectedBundleCount > 0 ? 'pointer' : 'not-allowed',
                          opacity: selectedBundleCount > 0 ? 1 : 0.6,
                          boxShadow: '0 4px 12px rgba(244, 196, 102, 0.2)'
                        }}
                      >
                        {bundleAdding ? 'A carregar...' : `Adicionar ${selectedBundleCount} ao carrinho`}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleAddBundleToCart} // opens drawer immediately
                        disabled={bundleAdding || selectedBundleCount === 0}
                        style={{
                          width: '100%',
                          height: '48px',
                          borderRadius: '24px',
                          backgroundColor: '#007396',
                          color: 'white',
                          border: 'none',
                          fontWeight: '900',
                          fontSize: '0.95rem',
                          cursor: selectedBundleCount > 0 ? 'pointer' : 'not-allowed',
                          opacity: selectedBundleCount > 0 ? 1 : 0.6,
                          boxShadow: '0 4px 12px rgba(0, 115, 150, 0.2)'
                        }}
                      >
                        Comprar Já
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="bundle-section-mobile">
                <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                  <span className="section-subtitle">Aproveite mais por menos</span>
                  <h2 className="section-title" style={{
                    fontSize: '1.6rem',
                    fontWeight: '900',
                    color: '#2C3E50',
                    marginTop: '0.5rem',
                    textTransform: 'uppercase'
                  }}>
                    Frequentemente comprados <span style={{ color: '#007396' }}>em conjunto</span>
                  </h2>
                </div>

                <div className="mobile-bundle-grid">

                  {/* Card 1: Main Product */}
                  <div className={`bundle-card-wrapper ${!bundleSelections[0] ? 'deselected' : ''}`}>
                    <div
                      className={`bundle-checkbox ${bundleSelections[0] ? 'selected' : ''}`}
                      onClick={() => setBundleSelections(prev => [!prev[0], prev[1], prev[2]])}
                      style={{
                        backgroundColor: bundleSelections[0] ? '#FF9F1C' : 'white',
                        borderColor: bundleSelections[0] ? '#FF9F1C' : '#ddd',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {bundleSelections[0] && <Check size={14} strokeWidth={3} />}
                    </div>

                    <ProductCard
                      id={product.handle}
                      title={product.title}
                      price={selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount}
                      originalPrice={selectedVariant?.compareAtPrice?.amount || product.compareAtPriceRange?.minVariantPrice?.amount}
                      image={selectedImage}
                      category={product.productType || (product.tags.find(t => t.toLowerCase() === 'crianca') ? 'Crianças' : 'Sapatinhos')}
                      images={product.images.edges.map(e => ({ url: e.node.url, altText: e.node.altText }))}
                      colors={mainColorInfo.colors}
                      colorImages={mainColorInfo.colorImages}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#8097a5', textTransform: 'uppercase' }}>
                          Este produto ({selectedOptionsMap[Object.keys(selectedOptionsMap).find(k => k.toLowerCase().includes('cor') || k.toLowerCase().includes('col')) || ''] || ''})
                        </span>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#666' }}>
                          Tamanho: {selectedOptionsMap[Object.keys(selectedOptionsMap).find(k => k.toLowerCase().includes('tamanho') || k.toLowerCase().includes('size')) || ''] || 'Padrão'}
                        </div>
                      </div>
                    </ProductCard>
                  </div>

                  {/* Card 2: Related Product 1 */}
                  <div className={`bundle-card-wrapper ${!bundleSelections[1] ? 'deselected' : ''}`}>
                    <div
                      className={`bundle-checkbox ${bundleSelections[1] ? 'selected' : ''}`}
                      onClick={() => setBundleSelections(prev => [prev[0], !prev[1], prev[2]])}
                      style={{
                        backgroundColor: bundleSelections[1] ? '#FF9F1C' : 'white',
                        borderColor: bundleSelections[1] ? '#FF9F1C' : '#ddd',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {bundleSelections[1] && <Check size={14} strokeWidth={3} />}
                    </div>

                    <ProductCard
                      id={relatedProducts[0].handle}
                      title={relatedProducts[0].title}
                      price={relatedVariant1?.price.amount || relatedProducts[0].priceRange.minVariantPrice.amount}
                      originalPrice={relatedVariant1?.compareAtPrice?.amount || relatedProducts[0].compareAtPriceRange?.minVariantPrice?.amount}
                      image={relatedVariant1?.image?.url || relatedProducts[0].images.edges[0]?.node.url}
                      category={relatedProducts[0].productType || (relatedProducts[0].tags.find(t => t.toLowerCase() === 'crianca') ? 'Crianças' : 'Sapatinhos')}
                      images={relatedProducts[0].images.edges.map(e => ({ url: e.node.url, altText: e.node.altText }))}
                      colors={rel1ColorInfo.colors}
                      colorImages={rel1ColorInfo.colorImages}
                    >
                      <div>
                        <select
                          value={relatedVariant1?.selectedOptions.find(opt => opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size'))?.value || ''}
                          onChange={(e) => handleRelatedSizeChange(1, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            border: '1px solid #EAEAEA',
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            color: 'var(--color-text)',
                            outline: 'none',
                            backgroundColor: 'white',
                            cursor: 'pointer'
                          }}
                        >
                          {getProductSizes(relatedProducts[0]).map(sz => (
                            <option key={sz} value={sz}>{sz}</option>
                          ))}
                        </select>
                      </div>
                    </ProductCard>
                  </div>

                  {/* Card 3: Related Product 2 */}
                  <div className={`bundle-card-wrapper ${!bundleSelections[2] ? 'deselected' : ''}`}>
                    <div
                      className={`bundle-checkbox ${bundleSelections[2] ? 'selected' : ''}`}
                      onClick={() => setBundleSelections(prev => [prev[0], prev[1], !prev[2]])}
                      style={{
                        backgroundColor: bundleSelections[2] ? '#FF9F1C' : 'white',
                        borderColor: bundleSelections[2] ? '#FF9F1C' : '#ddd',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {bundleSelections[2] && <Check size={14} strokeWidth={3} />}
                    </div>

                    <ProductCard
                      id={relatedProducts[1].handle}
                      title={relatedProducts[1].title}
                      price={relatedVariant2?.price.amount || relatedProducts[1].priceRange.minVariantPrice.amount}
                      originalPrice={relatedVariant2?.compareAtPrice?.amount || relatedProducts[1].compareAtPriceRange?.minVariantPrice?.amount}
                      image={relatedVariant2?.image?.url || relatedProducts[1].images.edges[0]?.node.url}
                      category={relatedProducts[1].productType || (relatedProducts[1].tags.find(t => t.toLowerCase() === 'crianca') ? 'Crianças' : 'Sapatinhos')}
                      images={relatedProducts[1].images.edges.map(e => ({ url: e.node.url, altText: e.node.altText }))}
                      colors={rel2ColorInfo.colors}
                      colorImages={rel2ColorInfo.colorImages}
                    >
                      <div>
                        <select
                          value={relatedVariant2?.selectedOptions.find(opt => opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size'))?.value || ''}
                          onChange={(e) => handleRelatedSizeChange(2, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            border: '1px solid #EAEAEA',
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            color: 'var(--color-text)',
                            outline: 'none',
                            backgroundColor: 'white',
                            cursor: 'pointer'
                          }}
                        >
                          {getProductSizes(relatedProducts[1]).map(sz => (
                            <option key={sz} value={sz}>{sz}</option>
                          ))}
                        </select>
                      </div>
                    </ProductCard>
                  </div>

                </div>

                {/* Mobile summary bar */}
                <div className="mobile-bundle-summary" style={{
                  border: '2px solid #EAEAEA',
                  borderRadius: '20px',
                  marginBottom: '1.5rem'
                }}>
                  <div className="mobile-bundle-images">
                    {selectedThumbnails.map((imgUrl, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <span className="mobile-plus">+</span>}
                        <div className="mobile-bundle-img-wrapper" style={{
                          border: '2px solid #EAEAEA',
                          borderRadius: '12px'
                        }}>
                          <img src={imgUrl} alt="Bundle item" />
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="mobile-bundle-bar">
                    <span>Preço Total:</span>
                    <span className="mobile-bundle-price">{totalBundlePrice.toFixed(2)}€</span>
                  </div>
                </div>

                {/* Mobile actions */}
                <div className="mobile-bundle-actions">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddBundleToCart}
                    disabled={bundleAdding || selectedBundleCount === 0}
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '25px',
                      backgroundColor: '#F4C466',
                      color: '#2C3E50',
                      border: 'none',
                      fontWeight: '900',
                      fontSize: '1rem',
                      cursor: selectedBundleCount > 0 ? 'pointer' : 'not-allowed',
                      opacity: selectedBundleCount > 0 ? 1 : 0.6,
                      boxShadow: '0 4px 12px rgba(244, 196, 102, 0.2)'
                    }}
                  >
                    {bundleAdding ? 'A carregar...' : `Adicionar ${selectedBundleCount} ao carrinho`}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddBundleToCart}
                    disabled={bundleAdding || selectedBundleCount === 0}
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '25px',
                      backgroundColor: '#007396',
                      color: 'white',
                      border: 'none',
                      fontWeight: '900',
                      fontSize: '1rem',
                      cursor: selectedBundleCount > 0 ? 'pointer' : 'not-allowed',
                      opacity: selectedBundleCount > 0 ? 1 : 0.6,
                      boxShadow: '0 4px 12px rgba(0, 115, 150, 0.2)'
                    }}
                  >
                    Comprar Já
                  </motion.button>
                </div>

              </div>

            </div>
          )}

          {/* Related Products Shelf */}
          {relatedProducts.length > 0 && (
            <div style={{ borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '4rem', marginBottom: '6rem' }}>
              <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: isMobile ? '1.6rem' : '2.2rem',
                  fontWeight: '900',
                  color: '#2C3E50',
                  marginTop: '1rem',
                  textTransform: 'uppercase'
                }}>
                  Clientes também <span style={{ color: '#007396' }}>gostaram</span>
                </h2>
              </div>

              {/* Related list grid */}
              <div
                className={isMobile ? "mobile-gallery-scroll" : ""}
                style={{
                  display: isMobile ? 'flex' : 'grid',
                  gridTemplateColumns: isMobile ? 'unset' : 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '2.5rem',
                  overflowX: isMobile ? 'auto' : 'visible',
                  scrollSnapType: isMobile ? 'x mandatory' : 'none',
                  WebkitOverflowScrolling: 'touch',
                  margin: isMobile ? '0 -1.5rem' : '0',
                  padding: isMobile ? '0 1.5rem 1rem 1.5rem' : '0',
                  scrollbarWidth: 'none', /* Hide scrollbar for Firefox */
                  msOverflowStyle: 'none', /* Hide scrollbar for IE/Edge */
                }}
              >
                {isMobile && (
                  <style>{`
                    .mobile-gallery-scroll::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                )}
                {relatedProducts.map((p, idx) => {
                  const firstVar = p.variants.edges[0]?.node;
                  const price = firstVar?.price.amount || '0.00';
                  const image = p.images.edges[0]?.node.url || '';
                  const cardRotation = idx % 2 === 0 ? -1 : 1.5;

                  const colorSet = new Set<string>();
                  const colorImages: Record<string, string> = {};
                  p.variants.edges.forEach(e => {
                    const v = e.node;
                    const cOpt = v.selectedOptions.find(o => o.name.toLowerCase().includes('cor') || o.name.toLowerCase().includes('col'));
                    if (cOpt) {
                      colorSet.add(cOpt.value);
                      if (v.image?.url && !colorImages[cOpt.value]) {
                        colorImages[cOpt.value] = v.image.url;
                      }
                    }
                  });
                  const colors = Array.from(colorSet);

                  return (
                    <div
                      key={p.id}
                      style={{
                        flex: isMobile ? '0 0 calc(80% - 0.375rem)' : 'unset',
                        minWidth: 0,
                        scrollSnapAlign: isMobile ? 'center' : 'none',
                        transform: `rotate(${cardRotation}deg)`,
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <ProductCard
                        id={p.handle}
                        title={p.title}
                        price={price}
                        originalPrice={p.compareAtPriceRange?.minVariantPrice?.amount || '0.00'}
                        image={image}
                        category={p.productType || (p.tags.find(t => t.toLowerCase() === 'crianca') ? 'Crianças' : 'Sapatinhos')}
                        images={p.images.edges.map(e => ({ url: e.node.url, altText: e.node.altText }))}
                        colors={colors}
                        colorImages={colorImages}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Tabs: Reviews & FAQ (kept exactly as in the original ProductClient) */}
          <div className="bottom-tabs-container" style={{ borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '4rem' }}>
            <div className="bottom-tabs-nav">
              <button className={`bottom-tab-btn ${bottomTab === 'reviews' ? 'active' : ''}`} onClick={() => setBottomTab('reviews')}>Avaliações</button>
              <button className={`bottom-tab-btn ${bottomTab === 'faq' ? 'active' : ''}`} onClick={() => setBottomTab('faq')}>Perguntas frequentes</button>
            </div>

            {bottomTab === 'reviews' && (
              <div className="reviews-content">
                {[
                  { id: 1, name: 'Maria Silva', rating: 5, title: 'Super confortáveis!', date: '10 de Outubro de 2025', text: 'Estou apaixonada por estes sapatos! Nunca pensei que andar \'descalço\' fosse tão confortável. O espaço para os dedos é incrível e sinto as minhas pernas mais leves ao final do dia.' },
                  { id: 2, name: 'João Santos', rating: 5, title: 'Excelente qualidade', date: '5 de Novembro de 2025', text: 'Materiais de primeira. A entrega foi super rápida e o apoio ao cliente impecável. Recomendo vivamente a quem procura saúde para os pés.' },
                  { id: 3, name: 'Ana Pereira', rating: 4, title: 'Muito bons para o dia a dia', date: '20 de Janeiro de 2026', text: 'Uso-os para trabalhar e a diferença nas minhas dores de costas é notável. O design é simples mas elegante.' }
                ].map(review => (
                  <div
                    key={review.id}
                    className="review-item"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '24px',
                      padding: '24px',
                      border: '2px solid #EAEAEA',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.01)',
                      marginBottom: '20px'
                    }}
                  >
                    <div className="review-name">{review.name}</div>
                    <div className="review-header">
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="#F4C466" color="#F4C466" />)}
                      </div>
                      <span className="review-title">{review.title}</span>
                    </div>
                    <div className="review-date">avaliado em {review.date}</div>
                    <div className="review-divider" />
                    <p className="review-text">&ldquo;{review.text}&rdquo;</p>
                  </div>
                ))}
              </div>
            )}

            {bottomTab === 'faq' && (
              <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 0' }}>
                <div
                  className={isMobile ? "mobile-gallery-scroll" : ""}
                  style={{
                    display: isMobile ? 'flex' : 'grid',
                    gridTemplateColumns: isMobile ? 'unset' : 'repeat(4, 1fr)',
                    gridTemplateRows: isMobile ? 'unset' : 'auto auto',
                    gap: '1.25rem',
                    overflowX: isMobile ? 'auto' : 'visible',
                    scrollSnapType: isMobile ? 'x mandatory' : 'none',
                    WebkitOverflowScrolling: 'touch',
                    margin: isMobile ? '0 -1.5rem' : '0',
                    padding: isMobile ? '0 1.5rem 1rem 1.5rem' : '0',
                    scrollbarWidth: 'none', /* Hide scrollbar for Firefox */
                    msOverflowStyle: 'none', /* Hide scrollbar for IE/Edge */
                  }}
                >
                  {isMobile && (
                    <style>{`
                      .mobile-gallery-scroll::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>
                  )}
                  {[
                    {
                      q: 'O que é calçado barefoot?',
                      a: 'Calçado que imita a sensação de andar descalço, sola plana, flexível e com espaço para os dedos se moverem livremente.',
                      color: '#FF9F1C', bg: '#FFF3E0', icon: <Footprints size={22} />
                    },
                    {
                      q: 'A partir de que idade?',
                      a: 'Os nossos modelos estão disponíveis desde os primeiros passos. Consulta o nosso guia de tamanhos para encontrares o par certo.',
                      color: '#007396', bg: '#E0F2F1', icon: <Sprout size={22} />
                    },
                    {
                      q: 'Como medir o pé do meu filho?',
                      a: 'Coloca o pé numa folha, traça o contorno e mede do calcanhar à ponta do dedo mais comprido. Adiciona 1 cm para folga de crescimento.',
                      color: '#4CAF50', bg: '#E8F5E9', icon: <Maximize size={22} />
                    },
                    {
                      q: 'Qual a diferença para um sapato normal?',
                      a: 'O calçado barefoot oferece mais liberdade, ausência de estruturas rígidas, mais flexibilidade, elevado conforto e um movimento natural.',
                      color: '#E06A55', bg: '#FFEBEE', icon: <Activity size={22} />
                    },
                    {
                      q: 'São indicados para uso diário?',
                      a: 'Sim! São desenvolvidos para uso intenso, escola, parque, praia. Leves, respiráveis e fáceis de calçar.',
                      color: '#7B5EA7', bg: '#F3E5F5', icon: <Zap size={22} />
                    },
                    {
                      q: 'E se o tamanho não servir?',
                      a: 'Podes efetuar a troca ou devolução dentro de 30 dias. Queremos que escolhas com total confiança.',
                      color: '#F4C466', bg: '#FFFDE7', icon: <Feather size={22} />
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                      whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(0,0,0,0.06)' }}
                      style={{
                        minWidth: isMobile ? '78vw' : 'unset',
                        scrollSnapAlign: isMobile ? 'center' : 'none',
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        padding: '2rem 1.75rem',
                        border: '1px solid rgba(0,0,0,0.04)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem',
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                      }}
                    >
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '14px',
                        backgroundColor: item.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.color,
                        flexShrink: 0,
                      }}>
                        {item.icon}
                      </div>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '800',
                        color: '#2C3E50',
                        margin: 0,
                        lineHeight: 1.35,
                      }}>
                        {item.q}
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#777',
                        lineHeight: 1.7,
                        margin: 0,
                      }}>
                        {item.a}
                      </p>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                      minWidth: isMobile ? '78vw' : 'unset',
                      scrollSnapAlign: isMobile ? 'center' : 'none',
                      gridColumn: isMobile ? 'unset' : '4',
                      gridRow: isMobile ? 'unset' : '1 / span 2',
                      background: 'linear-gradient(160deg, #FF9F1C 0%, #F4C466 100%)',
                      borderRadius: '28px',
                      padding: '3rem 2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      gap: '1.5rem',
                      boxShadow: '0 16px 40px rgba(255,159,28,0.25)',
                      minHeight: isMobile ? '240px' : 'unset',
                    }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}>
                      <Sparkles size={30} />
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.4rem',
                        fontWeight: '900',
                        color: 'white',
                        margin: '0 0 0.6rem',
                        lineHeight: 1.25,
                      }}>
                        Tens mais alguma questão?
                      </h3>
                      <p style={{
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: '0.92rem',
                        lineHeight: 1.65,
                        margin: 0,
                      }}>
                        A nossa equipa está sempre disponível para te ajudar a escolher o par perfeito.
                      </p>
                    </div>
                    <Link href="/contactos" style={{ textDecoration: 'none', width: '100%' }}>
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          backgroundColor: 'white',
                          color: '#FF9F1C',
                          fontWeight: '800',
                          fontSize: '0.95rem',
                          padding: '14px 28px',
                          borderRadius: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                        }}
                      >
                        Falar Connosco <ArrowRight size={16} />
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      {/* Desktop-only Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="lightbox-overlay"
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0,0,0,0.88)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                background: 'rgba(255,255,255,0.12)',
                border: 'none',
                color: 'white',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                fontSize: '1.4rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(6px)',
                lineHeight: 1
              }}
            >
              ✕
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => Math.max(0, i - 1)); }}
              style={{
                position: 'absolute',
                left: '20px',
                background: 'rgba(255,255,255,0.12)',
                border: 'none',
                color: 'white',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                cursor: lightboxIndex === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: lightboxIndex === 0 ? 0.3 : 1,
                backdropFilter: 'blur(6px)'
              }}
            >
              <ChevronLeft size={26} />
            </button>

            {/* Main image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                maxWidth: '700px',
                width: '100%'
              }}
            >
              <img
                src={displayImages[lightboxIndex]?.url}
                alt={displayImages[lightboxIndex]?.altText || `Image ${lightboxIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.4)'
                }}
              />

              {/* Thumbnail strip */}
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {displayImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt={img.altText || `Thumb ${i + 1}`}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      border: lightboxIndex === i ? '3px solid #FF9F1C' : '2px solid rgba(255,255,255,0.2)',
                      opacity: lightboxIndex === i ? 1 : 0.65,
                      transition: 'all 0.15s',
                      flexShrink: 0
                    }}
                  />
                ))}
              </div>

              {/* Counter */}
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: '700' }}>
                {lightboxIndex + 1} / {displayImages.length}
              </span>
            </motion.div>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => Math.min(displayImages.length - 1, i + 1)); }}
              style={{
                position: 'absolute',
                right: '20px',
                background: 'rgba(255,255,255,0.12)',
                border: 'none',
                color: 'white',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                cursor: lightboxIndex === displayImages.length - 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: lightboxIndex === displayImages.length - 1 ? 0.3 : 1,
                backdropFilter: 'blur(6px)'
              }}
            >
              <ChevronRight size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>

  );
};

// Playful custom badge component
const PlayfulBadge = ({ children, color = '#FF9F1C', icon: Icon }: { children: React.ReactNode; color?: string; icon?: any }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 18px',
      backgroundColor: 'white',
      borderRadius: '30px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
      border: `2px dashed ${color}`,
      color: '#2C3E50',
      fontWeight: '800',
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      width: 'fit-content'
    }}
  >
    {Icon && <Icon size={16} color={color} />}
    {children}
  </motion.div>
);

export default ProductClient;
