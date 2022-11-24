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

      item = this.updateQualityOfItem(item);

      item.sellIn--;
      if (item.sellIn < 0) {
        item = this.updateQualityOfExpiredItem(item);
      }

      item = this.adjustForQualityLimits(item);
    }

    return this.items;
  }

  updateQualityOfItem(item: Item): Item {
    if (item.name === AGED_BRIE) {
      item.quality++;
    } else if (item.name === BACKSTAGE_PASSES) {
      return this.updateActiveBackstagePasses(item);
    } else {
      item.quality--;
    }

    return item;
  }

  updateActiveBackstagePasses(item: Item): Item {
    item.quality++;
    if (item.sellIn <= 10) {
      item.quality++;
    }
    if (item.sellIn <= 5) {
      item.quality++;
    }

    return item;
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
