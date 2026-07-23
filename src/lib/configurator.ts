/**
 * Data + pricing for the Build-Your-Clean configurator.
 * Pure functions, reuses the frequency model from the quote engine.
 */
import { frequencyOptions } from "./quote";

export type RoomType = {
  id: string;
  label: string;
  price: number;
  /** Whether the user can pick a quantity (e.g. bedrooms) vs a simple on/off. */
  perUnit: boolean;
  max: number;
  /** Icon key resolved to a lucide icon in the component. */
  icon: string;
};

export const roomTypes: RoomType[] = [
  { id: "kitchen", label: "Kitchen", price: 45, perUnit: false, max: 1, icon: "kitchen" },
  { id: "living", label: "Living", price: 30, perUnit: false, max: 1, icon: "living" },
  { id: "dining", label: "Dining", price: 20, perUnit: false, max: 1, icon: "dining" },
  { id: "bedroom", label: "Bedroom", price: 25, perUnit: true, max: 5, icon: "bedroom" },
  { id: "bathroom", label: "Bathroom", price: 35, perUnit: true, max: 4, icon: "bathroom" },
  { id: "study", label: "Study", price: 22, perUnit: false, max: 1, icon: "study" },
  { id: "laundry", label: "Laundry", price: 18, perUnit: false, max: 1, icon: "laundry" },
  { id: "hallway", label: "Hallway", price: 15, perUnit: false, max: 1, icon: "hallway" },
];

export const buildExtras: { id: string; label: string; price: number }[] = [
  { id: "oven", label: "Oven detail", price: 45 },
  { id: "windows", label: "Interior windows", price: 49 },
  { id: "fridge", label: "Inside fridge", price: 29 },
  { id: "eco", label: "Eco deep-pack", price: 25 },
];

export { frequencyOptions };

export type BuildState = {
  rooms: Record<string, number>;
  extras: string[];
  frequency: string;
};

export const initialBuildState: BuildState = {
  rooms: { kitchen: 1, living: 1, bedroom: 1, bathroom: 1 },
  extras: [],
  frequency: "fortnightly",
};

const round5 = (n: number) => Math.round(n / 5) * 5;

export type BuildEstimate = {
  total: number;
  roomsSubtotal: number;
  extrasSubtotal: number;
  discount: number;
  roomCount: number;
  recurring: boolean;
  frequencyLabel: string;
};

export function estimateBuild(state: BuildState): BuildEstimate {
  let roomsSubtotal = 0;
  let roomCount = 0;
  for (const room of roomTypes) {
    const qty = state.rooms[room.id] ?? 0;
    roomsSubtotal += room.price * qty;
    roomCount += qty;
  }

  let extrasSubtotal = 0;
  for (const id of state.extras) {
    const extra = buildExtras.find((e) => e.id === id);
    if (extra) extrasSubtotal += extra.price;
  }

  const subtotal = roomsSubtotal + extrasSubtotal;
  const freq = frequencyOptions.find((f) => f.id === state.frequency);
  const mult = freq?.mult ?? 1;
  const discount = mult < 1 ? Math.round(subtotal * (1 - mult)) : 0;
  const total = round5(subtotal - discount);

  return {
    total,
    roomsSubtotal,
    extrasSubtotal,
    discount,
    roomCount,
    recurring: mult < 1,
    frequencyLabel: freq?.label ?? "One-off",
  };
}
