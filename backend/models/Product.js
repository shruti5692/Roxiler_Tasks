const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'] 
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'], 
        min: [0, 'Price must be a positive number'] 
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'] 
    },
    category: { 
        type: String, 
        required: [true, 'Category is required'] 
    },
    image: { 
        type: String, 
        required: [true, 'Image URL is required'] 
    },
    sold: { 
        type: Boolean, 
        default: false 
    },
    dateOfSale: { 
        type: Date, 
        required: function() { 
            return this.sold === true;
        },
        default: null
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
