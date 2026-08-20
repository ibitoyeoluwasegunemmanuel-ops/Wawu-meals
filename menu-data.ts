import { MenuCategory } from "./types";

/**
 * Source of truth for the MVP: transcribed directly from the client's
 * "Wawu Meals — Bowls Menu" PDF. Every rice/soup/pasta/stew/peppersoup/other
 * dish is sold in one of four bulk sizes (1.5L / 2.5L / 3.5L / 5L). Proteins
 * are sold individually as add-ons at a single price, not by litre.
 *
 * This file drives the UI directly for the MVP so the menu works even
 * before Supabase is connected. Once the DB is wired up (see
 * supabase/schema.sql + supabase/seed.sql), swap the call sites in
 * app/page.tsx to fetch from Supabase instead — the shapes match 1:1.
 */

const variants = (v: [string, number][]) =>
  v.map(([size, price], i) => ({ id: `${size}-${i}`, size: size as any, price }));

export const MENU: MenuCategory[] = [
  {
    id: "rice",
    slug: "rice",
    name: "Rice",
    items: [
      {
        id: "rice-basmati-jollof",
        categoryId: "rice",
        name: "Basmati Jollof Rice",
        variants: variants([["1.5L", 25000], ["2.5L", 50000], ["3.5L", 70000], ["5L", 90000]]),
        isAvailable: true
      },
      {
        id: "rice-basmati-fried",
        categoryId: "rice",
        name: "Basmati Fried Rice",
        variants: variants([["1.5L", 30000], ["2.5L", 60000], ["3.5L", 80000], ["5L", 110000]]),
        isAvailable: true
      },
      {
        id: "rice-seafood-fried",
        categoryId: "rice",
        name: "Seafood Fried Rice",
        description: "Prawns, snails and fish",
        variants: variants([["1.5L", 45000], ["2.5L", 70000], ["3.5L", 95000], ["5L", 125000]]),
        isAvailable: true
      },
      {
        id: "rice-native",
        categoryId: "rice",
        name: "Native Rice",
        description: "Snail, prawns, fish, egg, assorted and pomo",
        variants: variants([["1.5L", 40000], ["2.5L", 60000], ["3.5L", 80000], ["5L", 120000]]),
        isAvailable: true
      },
      {
        id: "rice-coconut",
        categoryId: "rice",
        name: "Coconut Rice",
        description: "Diced turkey or goat meat and smoked fish",
        variants: variants([["1.5L", 40000], ["2.5L", 65000], ["3.5L", 85000], ["5L", 115000]]),
        isAvailable: true
      },
      {
        id: "rice-seafood-coconut",
        categoryId: "rice",
        name: "Seafood Coconut Rice",
        description: "Snails, prawns and fish",
        variants: variants([["1.5L", 55000], ["2.5L", 85000], ["3.5L", 100000], ["5L", 130000]]),
        isAvailable: true
      }
    ]
  },
  {
    id: "soup",
    slug: "soup",
    name: "Soup",
    items: [
      {
        id: "soup-afang",
        categoryId: "soup",
        name: "Afang Soup",
        description: "Goat meat or beef, assorted, pomo, smoked fish",
        variants: variants([["1.5L", 40000], ["2.5L", 60000], ["3.5L", 80000], ["5L", 100000]]),
        isAvailable: true
      },
      {
        id: "soup-edikang-ikong",
        categoryId: "soup",
        name: "Edikang-Ikong",
        description: "Goat meat or beef, assorted, pomo, periwinkle and smoked fish",
        variants: variants([["1.5L", 40000], ["2.5L", 60000], ["3.5L", 80000], ["5L", 100000]]),
        isAvailable: true
      },
      {
        id: "soup-ogbono",
        categoryId: "soup",
        name: "Ogbono Soup",
        description: "Goat meat or beef, assorted, pomo, periwinkle and smoked fish",
        variants: variants([["1.5L", 45000], ["2.5L", 65000], ["3.5L", 85000], ["5L", 110000]]),
        isAvailable: true
      },
      {
        id: "soup-egusi",
        categoryId: "soup",
        name: "Egusi",
        description: "Goat meat or beef, assorted, pomo and smoked fish",
        variants: variants([["1.5L", 45000], ["2.5L", 65000], ["3.5L", 85000], ["5L", 110000]]),
        isAvailable: true
      },
      {
        id: "soup-efo-riro",
        categoryId: "soup",
        name: "Efo Riro",
        description: "Goat meat or beef, assorted, pomo, fish, smoked fish",
        variants: variants([["1.5L", 40000], ["2.5L", 60000], ["3.5L", 80000], ["5L", 100000]]),
        isAvailable: true
      },
      {
        id: "soup-oha",
        categoryId: "soup",
        name: "Oha Soup",
        description: "Goat meat or beef, assorted, pomo, smoked fish",
        variants: variants([["1.5L", 40000], ["2.5L", 60000], ["3.5L", 80000], ["5L", 100000]]),
        isAvailable: true
      },
      {
        id: "soup-banga",
        categoryId: "soup",
        name: "Banga Soup",
        description: "Goat meat or beef, assorted, pomo, smoked fish",
        variants: variants([["1.5L", 40000], ["2.5L", 60000], ["3.5L", 80000], ["5L", 100000]]),
        isAvailable: true
      },
      {
        id: "soup-seafood-banga",
        categoryId: "soup",
        name: "Seafood Banga Soup",
        description: "Snails, prawns, cat fish and periwinkle",
        variants: variants([["1.5L", 55000], ["2.5L", 85000], ["3.5L", 100000], ["5L", 120000]]),
        isAvailable: true
      },
      {
        id: "soup-seafood-okro",
        categoryId: "soup",
        name: "Seafood Okro",
        description: "Fish, snails, crab, calamari, periwinkle",
        variants: variants([["1.5L", 50000], ["2.5L", 70000], ["3.5L", 90000], ["5L", 110000]]),
        isAvailable: true
      }
    ]
  },
  {
    id: "pasta",
    slug: "pasta",
    name: "Pasta",
    items: [
      {
        id: "pasta-native-spaghetti",
        categoryId: "pasta",
        name: "Native Spaghetti",
        description: "Assorted, smoked fish, snail, egg, pomo, prawns",
        variants: variants([["1.5L", 45000], ["2.5L", 65000], ["3.5L", 85000], ["5L", 110000]]),
        isAvailable: true
      },
      {
        id: "pasta-jollof-spaghetti",
        categoryId: "pasta",
        name: "Jollof Spaghetti",
        variants: variants([["1.5L", 30000], ["2.5L", 60000], ["3.5L", 80000], ["5L", 100000]]),
        isAvailable: true
      }
    ]
  },
  {
    id: "stews-sauces",
    slug: "stews-sauces",
    name: "Stews & Sauces",
    items: [
      {
        id: "stew-turkey",
        categoryId: "stews-sauces",
        name: "Turkey Stew",
        variants: variants([["1.5L", 45000], ["2.5L", 65000], ["3.5L", 85000], ["5L", 110000]]),
        isAvailable: true
      },
      {
        id: "stew-chicken",
        categoryId: "stews-sauces",
        name: "Chicken Stew",
        variants: variants([["1.5L", 45000], ["2.5L", 65000], ["3.5L", 85000], ["5L", 110000]]),
        isAvailable: true
      },
      {
        id: "stew-goat-meat",
        categoryId: "stews-sauces",
        name: "Goat Meat Stew",
        variants: variants([["1.5L", 45000], ["2.5L", 65000], ["3.5L", 85000], ["5L", 110000]]),
        isAvailable: true
      },
      {
        id: "stew-titus",
        categoryId: "stews-sauces",
        name: "Titus Stew",
        variants: variants([["1.5L", 40000], ["2.5L", 60000], ["3.5L", 80000], ["5L", 100000]]),
        isAvailable: true
      },
      {
        id: "stew-beef",
        categoryId: "stews-sauces",
        name: "Beef Stew",
        variants: variants([["1.5L", 40000], ["2.5L", 60000], ["3.5L", 80000], ["5L", 100000]]),
        isAvailable: true
      },
      {
        id: "sauce-fish",
        categoryId: "stews-sauces",
        name: "Fish Sauce",
        variants: variants([["1.5L", 45000], ["2.5L", 65000], ["3.5L", 85000], ["5L", 110000]]),
        isAvailable: true
      },
      {
        id: "sauce-ofada",
        categoryId: "stews-sauces",
        name: "Ofada Sauce",
        variants: variants([["1.5L", 45000], ["2.5L", 65000], ["3.5L", 85000], ["5L", 110000]]),
        isAvailable: true
      }
    ]
  },
  {
    id: "peppersoup",
    slug: "peppersoup",
    name: "Peppersoup",
    items: [
      {
        id: "pepper-goat",
        categoryId: "peppersoup",
        name: "Goat Meat Peppersoup",
        variants: variants([["1.5L", 30000], ["2.5L", 50000], ["3.5L", 70000], ["5L", 100000]]),
        isAvailable: true
      },
      {
        id: "pepper-assorted",
        categoryId: "peppersoup",
        name: "Assorted Peppersoup",
        variants: variants([["1.5L", 30000], ["2.5L", 50000], ["3.5L", 70000], ["5L", 100000]]),
        isAvailable: true
      },
      {
        id: "pepper-turkey",
        categoryId: "peppersoup",
        name: "Turkey Peppersoup",
        variants: variants([["1.5L", 30000], ["2.5L", 50000], ["3.5L", 70000], ["5L", 100000]]),
        isAvailable: true
      },
      {
        id: "pepper-catfish",
        categoryId: "peppersoup",
        name: "Catfish Peppersoup",
        variants: variants([["1.5L", 25000], ["2.5L", 40000], ["3.5L", 55000], ["5L", 80000]]),
        isAvailable: true
      }
    ]
  },
  {
    id: "other",
    slug: "other",
    name: "Other Dishes",
    items: [
      {
        id: "other-yam-pottage",
        categoryId: "other",
        name: "Yam Pottage",
        description: "Pomo, smoked fish",
        variants: variants([["1.5L", 30000], ["2.5L", 45000], ["3.5L", 60000], ["5L", 85000]]),
        isAvailable: true
      },
      {
        id: "other-beans-pottage",
        categoryId: "other",
        name: "Beans Pottage",
        description: "Cooked with yam or plantain",
        variants: variants([["1.5L", 30000], ["2.5L", 45000], ["3.5L", 60000], ["5L", 85000]]),
        isAvailable: true
      }
    ]
  },
  {
    id: "proteins",
    slug: "proteins",
    name: "Proteins",
    note: "Sold by portion — add these on to any soup, rice or pottage",
    items: [
      {
        id: "protein-turkey",
        categoryId: "proteins",
        name: "Turkey",
        variants: [{ id: "std", size: "Standard", price: 8000 }],
        isAvailable: true
      },
      {
        id: "protein-chicken-lap",
        categoryId: "proteins",
        name: "Chicken Lap",
        variants: [{ id: "std", size: "Standard", price: 6000 }],
        isAvailable: true
      },
      {
        id: "protein-beef",
        categoryId: "proteins",
        name: "Beef",
        variants: [{ id: "std", size: "Standard", price: 2500 }],
        isAvailable: true
      },
      {
        id: "protein-goat-meat",
        categoryId: "proteins",
        name: "Goat Meat",
        variants: [{ id: "std", size: "Standard", price: 4500 }],
        isAvailable: true
      },
      {
        id: "protein-hake-fish",
        categoryId: "proteins",
        name: "Hake Fish",
        variants: [{ id: "std", size: "Standard", price: 3000 }],
        isAvailable: true
      },
      {
        id: "protein-titus-fish",
        categoryId: "proteins",
        name: "Titus Fish",
        variants: [{ id: "std", size: "Standard", price: 3000 }],
        isAvailable: true
      }
    ]
  }
];

export const VENDOR_BANK_DETAILS = {
  bankName: "Set in vendor dashboard",
  accountName: "Wawu Meals",
  accountNumber: "0000000000"
};

export const ORDERING_TERMS = [
  "All meals are freshly prepared to your preference.",
  "Orders are only confirmed once payment has been received.",
  "If you won't be consuming your meal immediately, transfer it into smaller containers before freezing to maintain freshness.",
  "Kindly inspect your order on delivery — notify us within 24 hours of any issues.",
  "Please tell us about any food allergies or dietary restrictions before ordering."
];
