import {
  Item,
  GildedRose,
  SULFURAS,
  AGED_BRIE,
  BACKSTAGE_PASSES,
} from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should decrease the quality of a generic item by 1 if sellIn has not passed", () => {
    const genericItem = new Item("generic item", 30, 50);
    const gildedRose = new GildedRose([genericItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(49);
  });

  it("should decrease the sellIn of a generic item by 1", () => {
    const genericItem = new Item("generic item", 30, 50);
    const gildedRose = new GildedRose([genericItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(29);
  });

  it("should decrease the quality of a generic item twice as fast if sellIn has passed", () => {
    const genericItem = new Item("generic item", -1, 50);
    const gildedRose = new GildedRose([genericItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(48);
  });

  it("should never make quality a negative value", () => {
    const genericItem = new Item("generic item", 30, 0);
    const gildedRose = new GildedRose([genericItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });

  it("should increase quality of aged brie by 1", () => {
    const agedBrieItem = new Item(AGED_BRIE, 30, 1);
    const gildedRose = new GildedRose([agedBrieItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(2);
  });

  it("should never increase quality of aged brie above 50", () => {
    const agedBrieItem = new Item(AGED_BRIE, 30, 50);
    const gildedRose = new GildedRose([agedBrieItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
  });

  it("should never change Sulfuras quality or sellIn", () => {
    const sulfurasItem = new Item(SULFURAS, 50000, 80);
    const gildedRose = new GildedRose([sulfurasItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(50000);
    expect(items[0].quality).toBe(80);
  });

  it("should increase quality of concert passes by 1 if more than 10 days until the concert", () => {
    const concertPassesItem = new Item(BACKSTAGE_PASSES, 11, 1);
    const gildedRose = new GildedRose([concertPassesItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(2);
  });

  it("should increase quality of concert passes by 2 if less than or equal to 10 days until the concert", () => {
    const concertPassesItem = new Item(BACKSTAGE_PASSES, 10, 1);
    const gildedRose = new GildedRose([concertPassesItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(3);
  });

  it("should increase quality of concert passes by 3 if less than or equal to 5 days until the concert", () => {
    const concertPassesItem = new Item(BACKSTAGE_PASSES, 5, 1);
    const gildedRose = new GildedRose([concertPassesItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(4);
  });

  it("should never increase quality of concert passes above 50", () => {
    const concertPassesItem1 = new Item(BACKSTAGE_PASSES, 11, 50);
    const concertPassesItem2 = new Item(BACKSTAGE_PASSES, 10, 49);
    const concertPassesItem3 = new Item(BACKSTAGE_PASSES, 5, 48);
    const gildedRose = new GildedRose([
      concertPassesItem1,
      concertPassesItem2,
      concertPassesItem3,
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(50);
    expect(items[2].quality).toBe(50);
  });

  it("should decrease quality of concert passes to 0 if sellIn is 0 or less", () => {
    const concertPassesItem1 = new Item(BACKSTAGE_PASSES, 0, 50);
    const concertPassesItem2 = new Item(BACKSTAGE_PASSES, -1, 50);
    const gildedRose = new GildedRose([concertPassesItem1, concertPassesItem2]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
  });
});
