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

      if (item.name === AGED_BRIE) {
        item.quality++;
      } else if (item.name === BACKSTAGE_PASSES) {
        item.quality++;
        if (item.sellIn < 11) {
          item.quality++;
        }
        if (item.sellIn < 6) {
          item.quality++;
        }
      } else {
        item.quality--;
      }

      item.sellIn--;

      if (item.sellIn < 0) {
        item = this.updateQualityOfExpiredItem(item);
      }

      item = this.adjustForQualityLimits(item);
    }

    return this.items;
  }

  updateQualityOfExpiredItem(item: Item): Item {
    if (item.name === AGED_BRIE) {
      item.quality++;
    } else if (item.name === BACKSTAGE_PASSES) {
      item.quality = 0;
    } else {
      item.quality--;
    }

    return item;
  }

  adjustForQualityLimits(item: Item): Item {
    if (item.quality > 50) {
      item.quality = 50;
    }
    if (item.quality < 0) {
      item.quality = 0;
    }

    return item;
  }
}
