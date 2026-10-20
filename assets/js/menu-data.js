// Menu and prices as listed on smoreasia.com/order-online (October 2026).
// layout: "grid" shows photo cards, "list" shows text rows.
window.SMORE_MENU = [
  {
    id: "sets", name: "Set menus", zh: "套餐", layout: "grid",
    intro: "Bundles of a bento or snack with sides and drinks. Good for one, two, or a quick lunch.",
    items: [
      { name: "Classic Braised Pork Feast", zh: "黑金滷肉飯套餐", price: 14.36, img: "braised-pork-feast",
        desc: "Braised pork rice with a snack and a drink of your choice." },
      { name: "Taiwanese Double Delight", zh: "台味雙享", price: 37.83, img: "double-delight",
        desc: "For two: pick 2 bentos, 2 sides and 2 drinks." },
      { name: "Solo Feast", zh: "獨享盛宴", price: 21.46, img: "solo-feast",
        desc: "Your choice of bento, a side dish and a dessert." },
      { name: "Snack & Sip for 2", zh: "小食雙享", price: 14.45, img: "snack-sip",
        desc: "Any 2 street snacks from One Bite and 2 drinks." },
      { name: "Craving Combo", zh: "", price: 7.22, img: "craving-combo",
        desc: "Your favourite One Bite snack plus a drink." }
    ]
  },
  {
    id: "bento", name: "Bento", zh: "便當", layout: "grid",
    intro: "Served over white rice. Most come with marinated egg, tofu and seasonal greens.",
    items: [
      { name: "Taiwanese Braised Pork Bento", zh: "古早味滷肉飯", price: 7.5, img: "braised-pork-bento",
        desc: "Slow-cooked pork belly in a savoury soy sauce over rice, with seasonal greens." },
      { name: "Taiwanese Shredded Chicken Bento", zh: "台式雞絲飯", price: 7.5,
        desc: "Shredded chicken on rice, finished with chicken oil and soy, with seasonal greens." },
      { name: "Railway Chicken Leg Bento", zh: "鐵路雞腿便當", price: 12.5, img: "railway-chicken-bento",
        desc: "A seasoned chicken leg cooked golden, with marinated egg, tofu and greens." },
      { name: "Taiwanese Fried Chicken Bento", zh: "台式炸雞排便當", price: 12.5, img: "fried-chicken-bento",
        desc: "Crispy Taiwanese fried chicken with marinated egg, tofu and greens." },
      { name: "Braised Pork Chop Bento", zh: "滷香豬排便當", price: 12.5, img: "pork-chop-bento",
        desc: "Slow-braised pork ribs with marinated egg, tofu and greens." },
      { name: "Teriyaki Chicken Bento", zh: "照燒雞肉便當", price: 12.5, img: "teriyaki-bento",
        desc: "Chicken glazed in sweet teriyaki sauce, with marinated egg, tofu and greens." },
      { name: "Braised Tofu Bento", zh: "滷豆腐菜頭便當", price: 10.5, img: "braised-tofu-bento", veg: true,
        desc: "Tofu and mooli simmered in a rich savoury sauce, with marinated egg and greens." },
      { name: "Japanese Beef Bento", zh: "日式肥牛丼", price: 13.5, img: "japanese-beef-bento",
        desc: "Thin-sliced beef simmered in a sweet soy sauce, with marinated egg, tofu and greens." },
      { name: "Sweet & Sour Chicken Bento", zh: "粤式咕咾雞便當", price: 13.5, img: "sweet-sour-chicken-bento",
        desc: "Crispy battered chicken in our sweet and sour sauce, with marinated egg, tofu and greens." },
      { name: "Sweet & Sour King Prawn Bento", zh: "粤式咕咾蝦便當", price: 14.5,
        desc: "Battered king prawns in house sweet and sour sauce, with cabbage, egg, tofu and greens." },
      { name: "Crispy Soy Glazed Fish Bento", zh: "香脆紅魚便當", price: 16.5, img: "soy-fish-bento",
        desc: "Crispy fish fillets in a sweet soy glaze, with marinated egg, tofu and greens." }
    ]
  },
  {
    id: "one-bite", name: "One Bite", zh: "小食", layout: "grid",
    intro: "Night market snacks for sharing, or for yourself.",
    items: [
      { name: "Taiwanese Popcorn Chicken", zh: "鹽酥雞", price: 7.5, img: "popcorn-chicken",
        desc: "Marinated bite-size chicken in a light crispy batter, tossed with garlic, basil and a little spice." },
      { name: "Jumbo Chicken Fillet", zh: "豪大雞排", price: 9.5, img: "jumbo-chicken-fillet",
        desc: "An oversized chicken breast in our crispy batter. A Taiwanese street food classic." },
      { name: "Crispy Chicken Wings (3)", zh: "金酥雞翅", price: 7.5, img: "chicken-wings",
        desc: "Golden-fried wings, crisp outside and juicy inside." },
      { name: "Taiwanese Sausage (2)", zh: "台灣香腸", price: 5, img: "taiwanese-sausage",
        desc: "Grilled Taiwanese-style sausages, lightly caramelised and spiced." },
      { name: "Braised Trio Delight", zh: "滷三香", price: 5, img: "braised-trio", veg: true,
        desc: "Mooli, tofu and egg simmered in our aromatic soy broth." },
      { name: "Golden Pumpkin Rice Cake", zh: "南瓜年糕", price: 6.5, img: "pumpkin-rice-cake", veg: true,
        desc: "Crispy fried glutinous rice cake with a soft, sweet pumpkin filling." }
    ],
    more: [
      { name: "SMORE Braised Platter", zh: "滷味拼盤", price: 16,
        desc: "Honeycomb tripe, dried tofu, ox tongue, pig ear, egg and tofu." },
      { name: "Salt & Pepper Squid", zh: "椒鹽魷魚", price: 9.5 },
      { name: "Salt & Pepper Spare Ribs", zh: "椒鹽排骨", price: 9.5,
        desc: "Spare ribs deep fried and tossed in salt and pepper." },
      { name: "Salt & Pepper King Prawn", zh: "椒鹽蝦", price: 9.5,
        desc: "King prawns deep fried and tossed in salt and pepper." },
      { name: "Salt & Pepper Tofu", zh: "椒鹽豆腐", price: 7.5, veg: true,
        desc: "Fresh tofu deep fried and tossed in salt and pepper." },
      { name: "Mini Spring Rolls (10)", zh: "迷你春捲", price: 7.5,
        desc: "Crispy mini spring rolls." }
    ]
  },
  {
    id: "sweet", name: "Sugar Rush Bite", zh: "古韻甘香", layout: "grid",
    intro: "Traditional desserts, served cold.",
    items: [
      { name: "Mango Pomelo Sago with Mini Pearls", zh: "楊枝甘露小丸子", price: 6.8, img: "mango-sago",
        desc: "Mango, pomelo and sago in coconut milk, with chewy mini tapioca pearls." },
      { name: "Tri-Colour Taro Ball Grass Jelly", zh: "三色芋圓仙草", price: 6.8, img: "taro-grass-jelly", veg: true,
        desc: "Cooling grass jelly with handmade taro balls in three flavours, in a light syrup." }
    ]
  },
  {
    id: "drinks", name: "Teahouse", zh: "人文茶館", layout: "list",
    intro: "Hand-shaken teas, coffee and Taiwanese sodas.",
    items: [
      { name: "Velvet Red Tea", zh: "泡沫紅茶", price: 4.95,
        desc: "Taiwanese red tea shaken to a creamy foam." },
      { name: "Milk Tea", zh: "手搖奶茶", price: 4.95,
        desc: "Hand-shaken milk tea made with premium tea leaves." },
      { name: "Vietnamese Iced Coffee", zh: "越南冰咖啡", price: 4.95,
        desc: "Slow-drip dark roast over condensed milk and ice." },
      { name: "Plum Juice", zh: "酸梅湯", price: 4.5 },
      { name: "Apple Sidra", zh: "蘋果西打", price: 4 },
      { name: "Heysong Sarsaparilla", zh: "黑松沙士", price: 4 },
      { name: "Coke", zh: "", price: 3 },
      { name: "Diet Coke", zh: "", price: 3 }
    ]
  }
];
