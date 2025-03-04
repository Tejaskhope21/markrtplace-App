export const categories = [
    {
      id: 1,
      name: "Electrical Wires",
      image: "https://5.imimg.com/data5/PA/HR/MY-55165110/electric-cable.jpg",
    },
    {
      id: 2,
      name: "Multimeters",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ2CzfDszTaWXoLbGZlWXspVkNjqmNERuqoHOfKndmaOjrVTz3qHhcfOt_Bf1LF1XSHMnplEE7p37hokfkqsv8Zd7hyc_jxsk-Tw2T1h97TbWJebqHY1pp3",
    },
    {
      id: 3,
      name: "Inverters",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQwCbhhCIUiKqJsnj_yoGY-PxJDJIVZ_MW0M9MS3-349k903wjrm-FWTO9obVKRQJlQXKVH33AvRSXgSnnfHkm5KgMYaCd1JJBk44hkZSU",
    },
    {
      id: 4,
      name: "Wall Switches",
      image: "https://www.norisys.com/assets/img/blog/Image-4.png",
    },
    {
      id: 5,
      name: "Fans",
      image:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRgknxCn9RUdJnxE6UEFkRqYSGficuu1__ziKz-bzpaUbcKuUEtTBKjQwl5pGQ8SpvUJnF_-fh1_SQKETF7dqmKWiqVAV9gXQoi19Ctj2Fxgm3-zQPGj3ta7v8",
    },
    {
      id: 7,
      name: "Rocker Switches",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQRUiUHGbJpsB2KwpEt5u-2_FdNH9v1yIF3AUoqnoxPEwXDQH-StAUkkmvGGpl2RSVYuvTgjn8mkAM01XIiG726sTHq5gybJbEyXqQbVaIhOzvEeBeiOvPHYgU",
    },
    {
      id: 8,
      name: "Transfer Switch",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC206klqRy8bXzTxjzzx7cfunsZNrvwPnEGg&s",
    },
  ];
  
  export const products = [
    {
      id: 1,
      name: "2.5 mm Electrical Electric Wire",
      image:
        "https://s.alicdn.com/@sc04/kf/H200c2741cb2b44a688b81d2add60f01eL.png_720x720q50.jpg",
      price: 8.89,
      rating: 4.1,
      reviews: 8829,
    },
    {
      id: 2,
      name: "LED Light Bulb 12W",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRPIeYiX1M5SLcoGDFGw8l59lPHNOt-NSyOTT33Ycdwsc1hiCZ4sXUb-XD7l8q7l5FUqFcVvgtTSKEeA7tOei08Qc6li-p29w5LXLdia61YwIpAh55YAEEyFQ",
      price: 2.99,
      rating: 4.5,
      reviews: 5674,
    },
    {
      id: 4,
      name: "Power Strip with USB Ports",
      image:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRxv29i7KEjKHtkb6pL3pq893cqFCtB2BDYrdkHTj-CTdD9-kMF6SBEVEuOfL_jZAOrvMpI7-lX-vjHuLdEorOONNH6qTfGGEQTpcoRP4UekkpfY8W0VhR5",
      price: 12.99,
      rating: 4.7,
      reviews: 7842,
    },
    {
      id: 5,
      name: "Digital Multimeter Tester",
      image: "https://m.media-amazon.com/images/I/71Ha9Y6ZtwL.jpg",
      price: 18.75,
      rating: 4.6,
      reviews: 4210,
    },
  ];
  
  const TempData = {
    ElectricalMaterialBulk: [
      {
        id: 1,
        name: "Hot Single Core Copper PVC House Wire",
        category: "Electrical Wire",
        price_per_meter: {
          "10-999": 16.91,
          "1000-9999": 16.02,
          ">=10000": 15.13,
        },
        MOQ: 10,
        colors: ["Red", "Blue", "Yellow", "Green"],
        length: "1m",
        number_of_cores: "Single-Core",
        images: [
          "https://images.pexels.com/photos/1361081/pexels-photo-1361081.jpeg",
          "https://images.pexels.com/photos/2955378/pexels-photo-2955378.jpeg",
          "https://images.pexels.com/photos/1808457/pexels-photo-1808457.jpeg",
          "https://images.pexels.com/photos/1036617/pexels-photo-1036617.jpeg",
        ],
        supplier: {
          name: "Guangdong Guozhong Wire And Cable Co., Ltd.",
          location: "Mumbai, India",
        },
        shipping: {
          free_shipping_above: 1000,
          cost: "Negotiable",
        },
      },
      {
        id: 2,
        name: "Multi-Strand Electrical Copper Wire",
        category: "Electrical Wire",
        price_per_meter: {
          "10-999": 20.5,
          "1000-9999": 18.75,
          ">=10000": 17.60,
        },
        MOQ: 10,
        colors: ["Black", "White", "Red", "Blue"],
        length: "1m",
        number_of_cores: "Multi-Core",
        images: [
          "https://images.pexels.com/photos/2909611/pexels-photo-2909611.jpeg",
          "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg",
          "https://images.pexels.com/photos/270320/pexels-photo-270320.jpeg",
          "https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg",
        ],
        supplier: {
          name: "Delhi Wire & Cables",
          location: "Delhi, India",
        },
        shipping: {
          free_shipping_above: 2000,
          cost: 500,
        },
      },
      {
        id: 3,
        name: "High-Voltage Industrial Power Cable",
        category: "Power Cable",
        price_per_meter: {
          "50-499": 250,
          "500-1999": 230,
          "2000+": 210,
        },
        MOQ: 50,
        colors: ["Black", "Gray"],
        length: "1m",
        number_of_cores: "Three-Core",
        images: [
          "https://images.pexels.com/photos/7679455/pexels-photo-7679455.jpeg",
          "https://images.pexels.com/photos/5686846/pexels-photo-5686846.jpeg",
          "https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg",
          "https://images.pexels.com/photos/373564/pexels-photo-373564.jpeg",
        ],
        supplier: {
          name: "Ahmedabad Power Solutions",
          location: "Ahmedabad, India",
        },
        shipping: {
          free_shipping_above: 5000,
          cost: 1000,
        },
      },
    ],
  };
  
  export default TempData;
  