export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export const SULFURAS = "Sulfuras, Hand of Ragnaros";
export const AGED_BRIE = "Aged Brie";
export const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
export const CONJURED = "Conjured";

const conjuredRegex = new RegExp(CONJURED, "i");

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      if (item.name === SULFURAS) {
        continue;
      }

      item.sellIn--;

      switch (true) {
        case item.name === AGED_BRIE:
          this.updateAgedBrie(item);
          break;
        case item.name === BACKSTAGE_PASSES:
          this.updateBackstagePasses(item);
          break;
        case conjuredRegex.test(item.name):
          this.updateConjured(item);
          break;
        default:
          this.updateNormalItem(item);
      }

      this.adjustForQualityLimits(item);
    }

    return this.items;
  }

  updateAgedBrie(item: Item): void {
    item.sellIn > 0 ? (item.quality += 1) : (item.quality += 2);
  }

  updateBackstagePasses(item: Item): void {
    item.quality++;
    if (item.sellIn < 10) {
      item.quality++;
    }
    if (item.sellIn < 5) {
      item.quality++;
    }
    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateConjured(item: Item): void {
    item.sellIn > 0 ? (item.quality -= 2) : (item.quality -= 4);
  }

  updateNormalItem(item: Item): void {
    item.sellIn > 0 ? (item.quality -= 1) : (item.quality -= 2);
  }

  adjustForQualityLimits(item: Item): void {
    if (item.quality > 50) {
      item.quality = 50;
    }
    if (item.quality < 0) {
      item.quality = 0;
    }
  }
}
