exports.getCardPrices = function(cardName, res){

    var crawlerJS = require('crawler-js');
    var cards = [];
    var crawler = {
        interval: 1000,
        getSample: 'http://www.mtgbrasil.com.br/index.php?route=product/search&search=' + cardName,
        get: 'http://www.mtgbrasil.com.br/index.php?route=product/search&search='+ cardName,
        preview: 3,
        extractors: [
            {
                selector: 'div.product-list',
                callback: function (err, html) {
                    
                    var names = $(html.find(".name a"));
                    var desc = $(html.find(".description"));
                    var price = $(html.find(".price"));
                    var size = names.length;
                    

                    for(var i = 0; i < size; i++){
                        var card = new Object();
                        card.name = names[i].children[0].data;
                        card.desc = desc[i].children[0].data;
                        card.price = price[i].children[0].data;

                        cards[i] = card;
                    }
                    res.json(cards); 
                }
            }
        ]
    }

    crawlerJS(crawler);
};
