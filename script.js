// Business Logic Functions

/**
 * Calculate auction fee based on winning bid
 * @param {number} winningBid - Winning bid amount in JPY
 * @returns {number} Auction fee in JPY
 */

const AUTOCOM = 1;
const ICM = 2;

function getAuctionFee(winningBid) {
    // Validate input
    if (typeof winningBid !== 'number' || winningBid < 0) {
        throw new Error('Winning bid must be a positive number');
    }

    // Calculate auction fee based on winning bid ranges
    if (winningBid < 1500000) {
        return 300000;
    } else if (winningBid < 2000000) {
        return 350000;
    } else if (winningBid < 2500000) {
        return 400000;
    } else if (winningBid < 3000000) {
        return 450000;
    } else {
        return 500000;
    }
}

/**
 * Calculate charges based on winning bid amount
 * @param {number} winningBid - The winning bid amount in JPY
 * @returns {number} The calculated charges in JPY
 */
function calculateCharges(winningBid, exporter) {
    // Input validation
    if (typeof winningBid !== 'number' || winningBid < 0) {
        throw new Error('Winning bid must be a positive number');
    }

    if (exporter === AUTOCOM) {
        // For bids up to 1,000,000 JPY
        if (winningBid <= 1000000) {
            return 217000;
        }
        
        // For bids between 1,001,000 and 1,500,000 JPY
        if (winningBid <= 1500000) {
            return 227000;
        }
        
        // For bids between 1,501,000 and 2,000,000 JPY
        if (winningBid <= 2000000) {
            return 247000;
        }
        
        // For bids between 2,000,000 and 2,500,000 JPY
        if (winningBid <= 2500000) {
            return 267000;
        }
        
        // For bids between 2,500,000 and 3,000,000 JPY
        if (winningBid <= 3000000) {
            return 287000;
        }
        
        // For bids above 3,000,000 JPY
        const baseCharge = 287000;
        const additionalAmount = winningBid - 3000000;
        const additionalCharges = Math.ceil(additionalAmount / 500000) * 20000;
        
        return baseCharge + additionalCharges;
    }else{
        let fobTotal = 0;
        if (winningBid <= 1000000) {
            fobTotal = 155000;
        } else if (winningBid <= 1500000) {
            fobTotal = 165000;
        } else if (winningBid <= 2000000) {
            fobTotal = 170000;
        } else if (winningBid <= 2500000) {
            fobTotal = 185000;
        } else if (winningBid <= 3000000) {
            fobTotal = 195000;
        } else if (winningBid <= 3500000) {
            fobTotal = 210000;
        } else if (winningBid <= 4000000) {
            fobTotal = 220000;
        } else if (winningBid <= 4500000) {
            fobTotal = 240000;
        } else if (winningBid <= 5000000) {
            fobTotal = 255000;
        } else if (winningBid <= 5500000) {
            fobTotal = 270000;
        } else if (winningBid <= 6000000) {
            fobTotal = 280000;
        } else if (winningBid <= 6500000) {
            fobTotal = 295000;
        } else if (winningBid <= 7000000) {
            fobTotal = 305000;
        } else if (winningBid <= 7500000) {
            fobTotal = 320000;
        } else if (winningBid <= 8000000) {
            fobTotal = 330000;
        } else if (winningBid <= 8500000) {
            fobTotal = 345000;
        } else if (winningBid <= 9000000) {
            fobTotal = 355000;
        } else if (winningBid <= 9500000) {
            fobTotal = 370000;
        } else if (winningBid <= 10000000) {
            fobTotal = 380000;
        } else if (winningBid <= 12000000) {
            fobTotal = 450000;
        } else {
            // For bids above 12,000,000 JPY (not allowed)
            fobTotal = 0; // or 0, or throw an error
        }

        return fobTotal + 3000; // Adding fixed charge of 3,000 JPY Warranty Cost
    }


}

/**  
 * Get maximum discount voucher based on auction price
 * @param {number} auctionPrice - Auction price in LKR
 * @returns {number|null} Maximum discount voucher in LKR or null if not applicable
 */
function getMaxDiscountVoucher(auctionPrice) {
    // Validate input
    if (typeof auctionPrice !== 'number' || auctionPrice < 1) {
        return null; // or throw an error
    }

    let maxDiscount = 0;

    // Note: Using <= for upper bounds as per the table ranges
    if (auctionPrice <= 1000000) {
        maxDiscount = 80000;
    } else if (auctionPrice <= 1500000) {
        maxDiscount = 90000;
    } else if (auctionPrice <= 2000000) {
        maxDiscount = 95000;
    } else if (auctionPrice <= 2500000) {
        maxDiscount = 105000;
    } else if (auctionPrice <= 3000000) {
        maxDiscount = 115000;
    } else if (auctionPrice <= 3500000) {
        maxDiscount = 130000;
    } else if (auctionPrice <= 4000000) {
        maxDiscount = 140000;
    } else if (auctionPrice <= 4500000) {
        maxDiscount = 160000;
    } else if (auctionPrice <= 5000000) {
        maxDiscount = 170000;
    } else if (auctionPrice <= 5500000) {
        maxDiscount = 180000;
    } else if (auctionPrice <= 6000000) {
        maxDiscount = 190000;
    } else if (auctionPrice <= 6500000) {
        maxDiscount = 205000;
    } else if (auctionPrice <= 7000000) {
        maxDiscount = 215000;
    } else if (auctionPrice <= 7500000) {
        maxDiscount = 230000;
    } else if (auctionPrice <= 8000000) {
        maxDiscount = 240000;
    } else if (auctionPrice <= 8500000) {
        maxDiscount = 250000;
    } else if (auctionPrice <= 9000000) {
        maxDiscount = 260000;
    } else if (auctionPrice <= 9500000) {
        maxDiscount = 270000;
    } else if (auctionPrice <= 10000000) {
        maxDiscount = 280000;
    } else if (auctionPrice <= 12000000) {
        maxDiscount = 300000;
    } else {
        return 0; // or 0, or the maximum value of 300000
    }

    return maxDiscount;
}

/**
 * Calculate all taxes for imported vehicle based on CIF value in LKR, tax category, and capacity
 * @param {number} cif - CIF value in LKR (Sri Lankan Rupees)
 * @param {string} taxCategory - Tax category identifier
 * @param {number} capacity - Engine capacity in cc
 * @returns {object} Object containing all tax components and total tax
 */
function calculateVehicleTax(fob, shipping, taxCategory, capacity) {
    // Input validation
    if (typeof fob !== 'number' || fob < 0) {
        throw new Error('FOB must be a positive number');
    }
    
    if (typeof capacity !== 'number' || capacity < 0) {
        throw new Error('Capacity must be a positive number');
    }
    const yenrate = parseFloat(yenrateInput.value);
    console.log("FOB: ", taxBaseInput.value);  
    const taxBase = parseFloat(taxBaseInput.value)*(100/110)*0.85; // Convert tax base to FOB equivalent
    console.log("Tax Base (FOB equivalent): ", taxBase);
    let cifYen = (fob + shipping);
    if(taxBase > fob) {
        cifYen = (taxBase + shipping);
    }
    let cif = cifYen * yenrate;
    // Tax rates based on category
    const taxRates = {
        // -- <1000cc Hybrid [HS Code: 8703.40.28]
        'hybrid_under_1000': {
            getExciseDuty: (capacity) => {
                return 1810900; // Fixed rate for <1000cc Hybrid
            },
            cidRate: 0.20, // 20%
            surchargeRate: 0.50, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 5500000,
            luxuryRate: 0.8 // 80%
        },
        // -- <1000cc Petrol [HS Code: 8703.21.69]
        'petrol_under_1000': {
            getExciseDuty: (capacity) => {
                if (capacity <= 660) {
                    return 1992000; // Fixed rate for <800cc
                } else {
                    return capacity * 2450; // Default for >1000cc
                }
            },
            cidRate: 0.20, // 20%
            surchargeRate: 0.50, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 5000000,
            luxuryRate: 1.0 // 100%
        },
        // 1000cc < -- <1300cc Hybrid [HS Code: 8703.40.35]
        'hybrid_1000_1300': {
            getExciseDuty: (capacity) => {
                return capacity * 2750;
                
            },
            cidRate: 0.20, // 20%
            surchargeRate: 0.50, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 5500000,
            luxuryRate: 0.8 // 80%
        },
        // 1000cc < -- <1300cc Petrol [HS Code: 8703.22.50]
        'petrol_1000_1300': {
            // Calculate excise duty based on capacity
            getExciseDuty: (capacity) => {
                    return capacity * 3850;
            },
            cidRate: 0.20, // 20%
            surchargeRate: 0.50, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 5500000,
            luxuryRate: 0.8 // 80%
        },
        // 1300cc < -- <1500cc Hybrid [HS Code: 8703.40.35]
        'hybrid_1300_1500': {
            getExciseDuty: (capacity) => {
                return capacity * 3450;
            },
            cidRate: 0.20, // 20%
            surchargeRate: 0.50, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 5500000,
            luxuryRate: 0.8 // 80%
        },
        // 1300cc < -- <1500cc Petrol [HS Code: 8703.22.50]
        'petrol_1300_1500': {
            getExciseDuty: (capacity) => {
                return capacity * 4450;
            },
            cidRate: 0.2, // 20%
            surchargeRate: 0.5, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 5000000,
            luxuryRate: 1.0 // 100%
        },
        // HEV 50kW < -- < 100kW not more than 1yr old [HS Code: 8703.80.73]
        'hev_50_100_1year': {
            getExciseDuty: (capacity) => {
                return capacity * 40970;
            },
            cidRate: 0.2, // 20%
            surchargeRate: 0.5, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 6000000,
            luxuryRate: 0.6 // 60%
        },
        // HEV 50kW < -- < 100kW more than 1yr old [HS Code: 8703.80.73]
        'hev_50_100_3year': {
            getExciseDuty: (capacity) => {
                return capacity * 43440;
            },
            cidRate: 0.2, // 20%
            surchargeRate: 0.5, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 6000000,
            luxuryRate: 0.6 // 60%
        },
    };

    // Default to hybrid_1000_1300 if category not found
    const category = taxRates[taxCategory] || taxRates['petrol_under_1000'];
    
    // Constants (same for all categories)
    const VEL = 15000; // Vehicle Emission Levy
    const COM = 1750; // Other charges

    // Calculate Luxury Tax based on category-specific threshold
    const luxuryTax = cif > category.luxuryThreshold ? 
        (cif - category.luxuryThreshold) * category.luxuryRate : 0;

    // Calculate Excise Duty using the category-specific function
    const exciseDuty = category.getExciseDuty(capacity);

    // Calculate Cess Import Duty (CID) - category-specific rate
    const cid = cif * category.cidRate;

    // Calculate Surcharge - category-specific rate
    const surcharge = cid * category.surchargeRate;

    // Calculate VAT base (CIF * 1.1 + excise duty + cid + surcharge)
    const vatBase = (cif * 1.1) + exciseDuty + cid + surcharge;
    const vat = vatBase * category.vatRate;

    // Calculate total tax
    const totalTax = luxuryTax + exciseDuty + cid + surcharge + vat + VEL + COM;

    // Return detailed breakdown
    return {
        cif: cif,
        taxCategory: taxCategory,
        capacity: capacity,
        taxRates: category,
        taxComponents: {
            CIF: parseFloat(cif.toFixed(2)),
            exciseDuty: parseFloat(exciseDuty.toFixed(2)),
            cid: parseFloat(cid.toFixed(2)),
            surcharge: parseFloat(surcharge.toFixed(2)),
            vat: parseFloat(vat.toFixed(2)),
            vel: VEL,
            com: COM,
            luxuryTax: parseFloat(luxuryTax.toFixed(2)),
        },
        totalTax: parseFloat(totalTax.toFixed(2)),
        totalWithCIF: parseFloat((cif + totalTax).toFixed(2))
    };
}

/**
 * Get shipping charges based on vehicle model
 * @param {string|number} model - Vehicle model name or model code
 * @returns {object} Object containing model, code, and shipping charges
 */
function getShippingCharges(input) {
    // Model to price mapping
    const shippingRates = {
        // ¥103,000 category
        1: { models: ["Alto", "Mira", "EK Wagon", "Wagon R", "Move", "Nissan Dayz", "TAFT", "Yaris"], charge: 103000 },
        
        // ¥109,000 category
        2: { models: ["Fit HV", "X bee", "Hustler", "Aqua", "Swift", "Note"], charge: 109000 },
        
        // ¥114,000 category
        3: { models: ["Raize", "Rocky", "Roomy"], charge: 114000 },
        
        // ¥119,000 category
        4: { models: ["Fielder", "Axio", "Other sedan"], charge: 119000 },
        
        // ¥124,000 category
        5: { models: ["Sienta HV", "Freed HV"], charge: 124000 },
        
        // ¥129,000 category
        6: { models: ["C-HR", "Vezel HV", "Yaris Cross"], charge: 129000 },
        
        // ¥135,000 category
        7: { models: ["Leaf", "Honda WR-V", "Audi Q3"], charge: 135000 },
        
        // ¥140,000 category
        8: { models: ["Corolla cross"], charge: 140000 },
        
        // ¥145,000 category
        9: { models: ["Eclips cross", "Honda ZR-V"], charge: 145000 },
        
        // ¥150,000 category
        10: { models: ["Voxy HV", "Noah HV", "X-trail"], charge: 150000 },
        
        // ¥155,000 category
        11: { models: ["CR-V", "Step Wagon"], charge: 155000 },
        
        // ¥166,000 category
        12: { models: ["HIACE V", "NISSAN CARAVAN"], charge: 166000 },
        
        // ¥176,000 category
        13: { models: ["ALPHARD", "VELLFIRE"], charge: 176000 },
        
        // ¥186,000 category
        14: { models: ["Land Cruiser Prado"], charge: 186000 }
    };

    // Create reverse lookup for model name to code
    const modelToCode = {};
    Object.keys(shippingRates).forEach(code => {
        shippingRates[code].models.forEach(model => {
            modelToCode[model.toLowerCase()] = parseInt(code);
        });
    });

    // If input is a number (model code)
    if (typeof input === 'number') {
        const code = input;
        if (shippingRates[code]) {
            return {
                code: code,
                models: shippingRates[code].models,
                charge: shippingRates[code].charge,
                chargeFormatted: `¥${shippingRates[code].charge.toLocaleString()}`
            };
        } else {
            throw new Error(`Invalid model code: ${code}. Please use codes 1-14.`);
        }
    }
    
    // If input is a string (model name)
    if (typeof input === 'string') {
        const modelLower = input.trim().toLowerCase();
        const code = modelToCode[modelLower];
        
        if (code) {
            return {
                code: code,
                model: input.trim(),
                models: shippingRates[code].models,
                charge: shippingRates[code].charge,
                chargeFormatted: `¥${shippingRates[code].charge.toLocaleString()}`
            };
        } else {
            // Try partial match
            const matchingCodes = [];
            Object.keys(modelToCode).forEach(modelKey => {
                if (modelKey.includes(modelLower) || modelLower.includes(modelKey)) {
                    if (!matchingCodes.includes(modelToCode[modelKey])) {
                        matchingCodes.push(modelToCode[modelKey]);
                    }
                }
            });
            
            if (matchingCodes.length === 1) {
                const code = matchingCodes[0];
                return {
                    code: code,
                    model: input.trim(),
                    models: shippingRates[code].models,
                    charge: shippingRates[code].charge,
                    chargeFormatted: `¥${shippingRates[code].charge.toLocaleString()}`,
                    note: "Partial match found"
                };
            } else if (matchingCodes.length > 1) {
                throw new Error(`Multiple models found for "${input}". Please be more specific.`);
            } else {
                // Default to Vezel if not found
                return {
                    code: 6,
                    model: "Vezel",
                    models: shippingRates[6].models,
                    charge: shippingRates[6].charge,
                    chargeFormatted: `¥${shippingRates[6].charge.toLocaleString()}`,
                    note: "Model not found, using default (Vezel)"
                };
            }
        }
    }
    
    throw new Error('Input must be a string (model name) or number (model code 1-14)');
}

// UI Logic Functions

// DOM Elements
const vehicleSelect = document.getElementById('vehicle');
const vehicleVariantSelect = document.getElementById("vehicleVariant");
const winningBidInput = document.getElementById('winningBid');
const areaCostInput = document.getElementById('areaCost');
const auctionFeeInput = document.getElementById('auctionFee');
const ttInput = document.getElementById('tt');
const yenrateInput = document.getElementById('yenrate');
const clearingInput = document.getElementById('clearing');
const calculateBtn = document.getElementById('calculateBtn');
const resultsContainer = document.getElementById('resultsContainer');
const taxBreakdown = document.getElementById('taxBreakdown');
const totalTaxElement = document.getElementById('totalTax');
const totalPayableElement = document.getElementById('totalPayable');
const summaryDetails = document.getElementById('summaryDetails');
const vehicleInfo = document.getElementById('vehicleInfo');
const taxCategorySelect = document.getElementById('taxcategory');
const taxBaseInput = document.getElementById('taxbase');
const exporterSelect = document.getElementById('exporter');
const capacityInput = document.getElementById('capacity');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');

// Format currency
function formatCurrency(amount, currency = 'LKR', isYen = false) {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    
    if (isYen) {
        return `¥${formatter.format(amount)}`;
    } else {
        return `${currency} ${formatter.format(amount)}`;
    }
}

// Create result card
function createResultCard(title, value, isYen = false, isLKR = false) {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    const titleEl = document.createElement('div');
    titleEl.className = 'result-title';
    titleEl.textContent = title;
    
    const valueEl = document.createElement('div');
    valueEl.className = 'result-value';
    
    if (isYen) {
        valueEl.classList.add('result-value-jpy');
        valueEl.innerHTML = `<span class="currency-symbol">¥</span>${parseInt(value).toLocaleString()}`;
    } else if (isLKR) {
        valueEl.classList.add('result-value-lkr');
        valueEl.innerHTML = `<span class="currency-symbol">LKR</span>${parseInt(value).toLocaleString()}`;
    } else {
        valueEl.innerHTML = `<span class="currency-symbol">LKR</span>${parseInt(value).toLocaleString()}`;
    }
    
    card.appendChild(titleEl);
    card.appendChild(valueEl);
    
    return card;
}

// Update vehicle info
function updateVehicleInfo(vehicle, shippingDetails) {
    vehicleInfo.innerHTML = `
        <div>
            <span class="vehicle-model">${vehicle}</span>
            <div>Shipping: <span class="vehicle-shipping">${formatCurrency(shippingDetails.charge, 'JPY', true)}</span></div>
        </div>
        <div>
            <div>Model Code: <strong>${shippingDetails.code}</strong></div>
            <div style="font-size: 0.8rem; color: #666;">Category: ${shippingDetails.models.join(', ')}</div>
        </div>
    `;
}

function updateVehicleDefaults() {
    const selectedVehicle = vehicleSelect.value;
    const defaults = vehicleDefaults[selectedVehicle];
    
    if (defaults) {
        // Update tax category (with fallback)
        if (taxCategorySelect.querySelector(`option[value="${defaults.taxCategory}"]`)) {
            taxCategorySelect.value = defaults.taxCategory;
        } else {
            // Fallback to a default category if the specified one doesn't exist
            taxCategorySelect.value = "hybrid_1300_1500";
        }
        
        // Update capacity
        if (defaults.capacity && defaults.capacity > 0) {
            capacityInput.value = defaults.capacity;
        } else {
            capacityInput.value = 1500; // Default capacity
        }
        
        // Update winning bid
        if (defaults.winningBid && defaults.winningBid > 0) {
            winningBidInput.value = defaults.winningBid;
        } else {
            winningBidInput.value = 2000000; // Default winning bid
        }

        taxBaseInput.value = defaults.taxbase;
    } else {
        // Default values if vehicle not in mapping
        taxCategorySelect.value = "hybrid_1300_1500";
        capacityInput.value = 1500;
        winningBidInput.value = 2000000;
    }
    
    // Trigger calculation
    calculateAndDisplay();
}

function updateVehicleVariants() {
  const vehicle = vehicleSelect.value;
  const variants = vehicleDefaults[vehicle];

  vehicleVariantSelect.innerHTML = "";

  if (!variants) return;

  variants.forEach((variant, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = variant.label;
    vehicleVariantSelect.appendChild(opt);
  });

  applyVehicleVariant(); // auto apply first variant
}

function applyVehicleVariant() {
  const vehicle = vehicleSelect.value;
  const variantIndex = vehicleVariantSelect.value;

  const variant = vehicleDefaults[vehicle]?.[variantIndex];
  if (!variant) return;

  taxCategorySelect.value = variant.taxCategory;
  taxBaseInput.value = variant.taxbase;
  capacityInput.value = variant.capacity;
  winningBidInput.value = variant.winningBid;

  calculateAndDisplay();
}

// Helper function to format tax names
function formatTaxName(key) {
    const names = {
        CIF: 'CIF',
        exciseDuty: 'Excise Duty',
        cid: 'CID (20% of CIF)',
        surcharge: 'SUR (50% of CID)',
        vat: 'VAT (18%)',
        vel: 'Vehicle Emission Levy',
        com: 'COM/EXM/SEL',
        luxuryTax: 'Luxury Tax'
    };
    return names[key] || key;
}

// Helper function to get auction fee category
function getAuctionFeeCategory(winningBid) {
    if (winningBid < 1500000) return 'Under ¥1.5M';
    else if (winningBid < 2000000) return '¥1.5M - ¥2M';
    else if (winningBid < 2500000) return '¥2M - ¥2.5M';
    else if (winningBid < 3000000) return '¥2.5M - ¥3M';
    else return 'Over ¥3M';
}

// Helper function to get handling fee category
function getHandlingFeeCategory(winningBid) {
    if (winningBid <= 1000000) return 'Under ¥1M';
    else if (winningBid <= 1500000) return '¥1M - ¥1.5M';
    else if (winningBid <= 2000000) return '¥1.5M - ¥2M';
    else if (winningBid <= 2500000) return '¥2M - ¥2.5M';
    else if (winningBid <= 3000000) return '¥2.5M - ¥3M';
    else return 'Over ¥3M';
}

// Calculate and display results
function calculateAndDisplay() {
    try {
        // Get input values
        const vehicle = vehicleSelect.value;
        const winningBid = parseFloat(winningBidInput.value);
        let TT = parseFloat(ttInput.value);
        const yenrate = parseFloat(yenrateInput.value);
        const clearing = parseFloat(clearingInput.value);
        const taxCategory = taxCategorySelect.value; // NEW: Get tax category
        const exporter = parseInt(exporterSelect.value);
        const capacity = parseFloat(capacityInput.value);
        const AreaCost = parseFloat(areaCostInput.value);
        const auctionFeeInputValue = parseFloat(auctionFeeInput.value);
        
        // Validate inputs
        if (!vehicle || isNaN(winningBid) || isNaN(TT) || isNaN(yenrate) || isNaN(clearing) || isNaN(capacity)) {
            alert('Please fill in all fields with valid numbers');
            return;
        }
        
        // Get shipping charges
        const shippingDetails = getShippingCharges(vehicle);
        const shipping = shippingDetails.charge;

        if(exporter === ICM){
            TT = getMaxDiscountVoucher(winningBid);
        }
        
        // Calculate other charges
        const handling = calculateCharges(winningBid, exporter);
        let auctionFee = 0;
        if(auctionFeeInputValue != 300000){
            auctionFee = auctionFeeInputValue;
        }else{
            auctionFee = getAuctionFee(winningBid);
        }
        
        // Calculate CIF
        const fob = winningBid + handling + AreaCost - TT;
        const cif = fob + shipping;
        const lkrCif = cif * yenrate;
        const bankCommission = lkrCif * 0.005;
        const LC = lkrCif + bankCommission;
        const lkrTT = TT * (yenrate + 0.01);

        // Calculate taxes
        const taxDetails = calculateVehicleTax(fob, shipping, taxCategory, capacity);
        const totalTax = taxDetails.totalTax;
        
        // Calculate total
        const totalLKR = auctionFee + lkrTT + LC + totalTax + clearing;
        
        // Update vehicle info
        updateVehicleInfo(vehicle, shippingDetails);
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        taxBreakdown.innerHTML = '';
        summaryDetails.innerHTML = '';
        
        // Display results
        const results = [
            { title: 'Winning Bid (JPY)', value: winningBid, isYen: true },
            { title: 'Shipping Charges (JPY)', value: shipping, isYen: true },
            { title: 'Handling Charges (JPY)', value: handling, isYen: true },
            { title: 'Area Cost (JPY)', value: AreaCost, isYen: true },
            { title: 'TT Deduction (LKR)', value: -TT, isYen: true },
            { title: 'CIF (JPY)', value: cif, isYen: true },
            { title: 'Auction Fee (LKR)', value: auctionFee, isLKR: true },
            { title: 'CIF (LKR) - LC Amount', value: lkrCif, isLKR: true },
            { title: 'Bank Commission', value: bankCommission, isLKR: true },
            { title: 'TT Amount (LKR)', value: lkrTT, isLKR: true },
            { title: 'Total Customs Tax', value: totalTax, isLKR: true },
            { title: 'Clearing Charges (LKR)', value: clearing, isLKR: true }
        ];
        
        results.forEach(result => {
            const card = createResultCard(result.title, result.value, result.isYen, result.isLKR);
            resultsContainer.appendChild(card);
        });
        
        // Display tax breakdown
        for (const [key, value] of Object.entries(taxDetails.taxComponents)) {
            const taxItem = document.createElement('div');
            taxItem.className = 'tax-item';
            
            const taxName = document.createElement('div');
            taxName.className = 'tax-name';
            taxName.textContent = formatTaxName(key);
            
            const taxAmount = document.createElement('div');
            taxAmount.className = 'tax-amount';
            taxAmount.textContent = formatCurrency(value, 'LKR');
            
            taxItem.appendChild(taxName);
            taxItem.appendChild(taxAmount);
            taxBreakdown.appendChild(taxItem);
        }
        
        // Update total tax
        totalTaxElement.innerHTML = `
            <span>Total Tax (LKR):</span>
            <span>${formatCurrency(totalTax, 'LKR')}</span>
        `;
        
        // Update total payable
        totalPayableElement.innerHTML = `
            <span>Total Amount Payable:</span>
            <span>${formatCurrency(totalLKR, 'LKR')}</span>
        `;
        
        // Display summary
        const summaryItems = [
            { label: 'Exchange Rate', value: `1 JPY = ${yenrate} LKR` },
            { label: 'Vehicle Model', value: vehicle },
            { label: 'Tax Category', value: taxCategorySelect.options[taxCategorySelect.selectedIndex].text }, // NEW
            { label: 'Shipping Category', value: `Code ${shippingDetails.code}` },
            { label: 'Auction Fee Category', value: getAuctionFeeCategory(winningBid) },
            { label: 'Handling Fee Category', value: getHandlingFeeCategory(winningBid) }
        ];
        
        summaryItems.forEach(item => {
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            
            const label = document.createElement('div');
            label.className = 'summary-label';
            label.textContent = item.label;
            
            const value = document.createElement('div');
            value.className = 'summary-value';
            value.textContent = item.value;
            
            summaryItem.appendChild(label);
            summaryItem.appendChild(value);
            summaryDetails.appendChild(summaryItem);
        });
        
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error(error);
    }
}

// PDF Generation Function
function generatePDF() {
    try {

        const info = prompt(
            "Please enter vehicle details (separate with commas):\n\n" +
            "Format: Year, Model Grade, Auction Grade, Mileage\n" +
            "Example: 2025, G, 5, 10000\n\n" +
            "Enter details:",
            "2025, G, 5, 10000"
        );
        
        if (info === null) return; // User cancelled
        
        // Parse the input
        const parts = info.split(',').map(part => part.trim());
        
        if (parts.length !== 4) {
            alert("Invalid format. Please enter all 4 values separated by commas.\nExample: 2025, G, 5, 10000");
            return;
        }
        
        const [vehicleYear, modelGrade, auctionGrade, mileage] = parts;

        // Get current values
        const vehicle = vehicleSelect.value;
        const winningBid = parseFloat(winningBidInput.value);
        let TT = parseFloat(ttInput.value);
        const yenrate = parseFloat(yenrateInput.value);
        const clearing = parseFloat(clearingInput.value);
        const taxCategory = taxCategorySelect.value;
        const capacity = parseFloat(capacityInput.value);
        const AreaCost = parseFloat(areaCostInput.value);
        const auctionFeeInputValue = parseFloat(auctionFeeInput.value);
        
        // Recalculate to get current values
        const shippingDetails = getShippingCharges(vehicle);
        const shipping = shippingDetails.charge;
        const exporter = parseInt(exporterSelect.value);

        if(exporter == ICM){
            TT = getMaxDiscountVoucher(winningBid);
        }

        const handling = calculateCharges(winningBid, exporter);
        let auctionFee = 0;
        if(auctionFeeInputValue != 300000){
            auctionFee = auctionFeeInputValue;
        }else{
            auctionFee = getAuctionFee(winningBid);
        }
        const fob = winningBid + handling + AreaCost - TT;
        const cif = fob + shipping;
        const lkrCif = cif * yenrate;
        const bankCommission = lkrCif * 0.005;
        const LC = lkrCif + bankCommission;
        const lkrTT = TT * (yenrate + 0.01);
        const taxDetails = calculateVehicleTax(fob, shipping, taxCategory, capacity);
        const totalTax = taxDetails.totalTax;
        const totalLKR = auctionFee + lkrTT + LC + totalTax + clearing;
        
        // Get current date and time
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const timeStr = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // Create PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Set red and black theme colors
        const primaryRed = [178, 34, 34]; // Firebrick red
        const darkRed = [139, 0, 0]; // Dark red
        const lightRed = [255, 99, 71]; // Tomato red
        const black = [0, 0, 0];
        const darkGray = [51, 51, 51];
        const lightGray = [245, 245, 245];
        
        // Add header with gradient
        doc.setFillColor(...primaryRed);
        doc.rect(0, 0, 210, 30, 'F');
        
        // Add DNM AUTO logo (text-based)
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.text("DNM AUTO", 25, 12);
        
        // Add company tagline
        doc.setFontSize(18);
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.text(" - Vehicle Import Specialists", 72, 12);

        doc.setFontSize(12);
        doc.text("Newtown, Embilipitiya | School Lane, Rukmalgama, Kottawa", 25, 20);
        doc.text("Tel: 077 847 2900 | 071 346 6099", 25, 26);
        
        // Add document title
        doc.setFontSize(16);
        doc.setTextColor(...darkRed);
        doc.setFont("helvetica", "bold");
        doc.text("VEHICLE IMPORT COST BREAKDOWN", 105, 40, null, null, 'center');
        
        // Add date and reference
        doc.setFontSize(10);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text(`Generated: ${dateStr} at ${timeStr}`, 105, 47, null, null, 'center');
        doc.text(`Reference: ${vehicle.replace(/\s+/g, '_')}_${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${Math.floor(Math.random() * 10000)}`, 105, 52, null, null, 'center');
        
        // Separator line with red color
        doc.setDrawColor(...primaryRed);
        doc.setLineWidth(0.8);
        doc.line(15, 57, 195, 57);
        
        // Vehicle Information Section
        doc.setFontSize(14);
        doc.setTextColor(...darkRed);
        doc.setFont("helvetica", "bold");
        doc.text("VEHICLE INFORMATION", 15, 68);
        
        // Add decorative box with red border
        doc.setDrawColor(...primaryRed);
        doc.setFillColor(255, 250, 250); // Very light red background
        doc.roundedRect(15, 73, 180, 30, 3, 3, 'F');
        doc.roundedRect(15, 73, 180, 30, 3, 3, 'S');
        
        doc.setFontSize(11);
        doc.setTextColor(black[0], black[1], black[2]);
        doc.setFont("helvetica", "normal");
        
        // Vehicle info in two columns with icons (simulated)
        doc.setFillColor(...primaryRed);
        doc.circle(21, 81, 1.5, 'F'); // Red bullet
        doc.text(`Vehicle Model: ${vehicle}`, 25, 82);
        
        doc.circle(21, 88, 1.5, 'F');
        doc.text(`Year & Grade: ${vehicleYear} ${modelGrade}`, 25, 89);
        
        doc.circle(21, 95, 1.5, 'F');
        doc.text(`Mileage: < ${mileage} km`, 25, 96);
        
        doc.circle(108, 81, 1.5, 'F');
        doc.text(`Engine Capacity: ${capacity} cc`, 112, 82);
        
        doc.circle(108, 88, 1.5, 'F');
        doc.text(`Auction Grade: ${auctionGrade}`, 112, 89);
        
        doc.circle(108, 95, 1.5, 'F');
        doc.text(`Approximate Delivery: 8 - 10 Weeks`, 112, 96);
        
        let yPos = 115;
        
        // Cost Breakdown Section
        doc.setFontSize(14);
        doc.setTextColor(...darkRed);
        doc.setFont("helvetica", "bold");
        doc.text(`COST BREAKDOWN (Yen Rate: ${yenrate} LKR)`, 15, yPos);
        yPos += 5;
        
        // Create table header
        doc.setFillColor(...darkRed);
        doc.roundedRect(15, yPos, 180, 8, 2, 2, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.text("Description", 25, yPos + 5.5);
        doc.text("Amount", 175, yPos + 5.5, null, null, 'right');
        yPos += 12;
        
        // Helper function to add table rows
        function addCostRow(description, amount, isYen = false, isHighlight = false) {
            if (isHighlight) {
                doc.setFillColor(255, 250, 250);
                doc.rect(15, yPos, 180, 8, 'F');
            }
            
            doc.setDrawColor(230, 230, 230);
            doc.setLineWidth(0.2);
            doc.line(15, yPos, 195, yPos);
            
            doc.setTextColor(black[0], black[1], black[2]);
            doc.setFont("helvetica", isHighlight ? "bold" : "normal");
            doc.setFontSize(10);
            
            // Add description with bullet
            if (!isHighlight) {
                doc.setFillColor(...primaryRed);
                doc.circle(25, yPos + 4.5, 1, 'F');
            }
            doc.text(description, 29, yPos + 5.5);
            
            // Format amount
            const formattedAmount = isYen ? 
                `¥${parseInt(amount).toLocaleString()}` : 
                `LKR ${parseInt(amount).toLocaleString()}`;
            
            doc.setTextColor(isYen ? darkRed[0] : darkGray[0], 
                           isYen ? darkRed[1] : darkGray[1], 
                           isYen ? darkRed[2] : darkGray[2]);
            doc.text(formattedAmount, 175, yPos + 5.5, null, null, 'right');
            
            yPos += 8;
        }
        
        // Add all cost items
        addCostRow('Winning Bid', winningBid, true);
        // addCostRow('Shipping Charges', shipping, true);
        addCostRow('Handling and Shipping Charges', handling+shipping, true);
        addCostRow('Area Cost', AreaCost, true);
        addCostRow('CIF Discount', -TT, true);
        addCostRow('CIF Value (JPY)', cif, true);
        yPos += 2;
        
        addCostRow('Auction Deposit and Insurance', auctionFee + lkrTT, false);
        addCostRow('CIF (LKR) - LC Amount', lkrCif, false);
        addCostRow('Bank Commission', bankCommission, false);
        // addCostRow('CIF Discount (LKR)', lkrTT, false);
        addCostRow('Clearing Charges', clearing, false);
        yPos += 5;
        
        // Tax Breakdown Section
        // doc.setFontSize(14);
        // doc.setTextColor(...darkRed);
        // doc.setFont("helvetica", "bold");
        // doc.text("TAX BREAKDOWN", 15, yPos);
        // yPos += 10;
        
        // // Add tax items
        // for (const [key, value] of Object.entries(taxDetails.taxComponents)) {
        //     const taxName = formatTaxName(key);
        //     addCostRow(taxName, value, false);
        // }
        
        // Total Tax (highlighted)
        addCostRow('TOTAL CUSTOMS TAX', totalTax, false, true);
        yPos += 8;
        
        // Final Total Amount Payable
        doc.setFillColor(...darkRed);
        doc.roundedRect(15, yPos, 180, 22, 3, 3, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("TOTAL AMOUNT PAYABLE", 105, yPos + 8, null, null, 'center');
        
        doc.setFontSize(20);
        doc.setTextColor(255, 215, 0); // Gold color for total
        doc.text(`LKR ${parseInt(totalLKR).toLocaleString()}`, 105, yPos + 17, null, null, 'center');
        
        yPos += 45;
        
        // Footer section
        doc.setDrawColor(...primaryRed);
        doc.setLineWidth(0.5);
        doc.line(15, yPos, 195, yPos);
        yPos += 8;
        
        doc.setFontSize(9);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.setFont("helvetica", "normal");
        
        // Disclaimer
        doc.setFontSize(8);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text("This quotation is valid for 7 days from the date of issue.", 105, yPos, null, null, 'center');
        doc.text("Prices are subject to change based on exchange rate fluctuations and government tax revisions.", 105, yPos + 4, null, null, 'center');
        doc.text("© 2025 DNM AUTO. All rights reserved.", 105, yPos + 8, null, null, 'center');
        
        // Page number
        // Save the PDF
        const fileName = `DNM_${vehicle.replace(/\s+/g, '_')}_Quotation_${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}.pdf`;
        doc.save(fileName);
        
    } catch (error) {
        alert(`Error generating PDF: ${error.message}`);
        console.error(error);
    }
}

// Vehicle default settings mapping
const vehicleDefaults = {
    // ¥103,000 category
    "Wagon R": [{ 
        label: "HYBRID ZX", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1736900, 
        capacity: 660, 
        winningBid: 1500000 
    },{
        label: "ZL", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1457500, 
        capacity: 660, 
        winningBid: 1445000 
    },{
        label: "CUSTOM ZX", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1551000, 
        capacity: 660, 
        winningBid: 1400000 
    },{
        label: "HYBRID FX-S", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1200000, 
        capacity: 660, 
        winningBid: 1150000 
    },{
        label: "PETROL FX", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1150000, 
        capacity: 660, 
        winningBid: 1000000 
    }],

    "Alto": [{ 
        label: "A", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1142900, 
        capacity: 660, 
        winningBid: 850000 
    },{
        label: "L", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1197900, 
        capacity: 660, 
        winningBid: 850000 
    },{
        label: "L Upgrade", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1379400, 
        capacity: 660, 
        winningBid: 950000 
    },{
        label: "HYBRID S", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1350800, 
        capacity: 660, 
        winningBid: 950000 
    },{
        label: "HYBRID X", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1519100, 
        capacity: 660, 
        winningBid: 1000000 
    }],

    "Mira": [{ 
        label: "G SA3", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1320000, 
        capacity: 660, 
        winningBid: 1250000 
    },{
        label: "X SA3", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1179200, 
        capacity: 660, 
        winningBid: 1000000 
    },{
        label: "L SA3", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1025200, 
        capacity: 660, 
        winningBid: 850000 
    },{
        label: "B SA3", 
        taxCategory: "petrol_under_1000", 
        taxbase: 992200, 
        capacity: 660, 
        winningBid: 750000 
    }],

    "Move": [{ 
        label: "L", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1358500, 
        capacity: 660, 
        winningBid: 1000000 
    },{
        label: "X", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1490500, 
        capacity: 660, 
        winningBid: 1250000 
    },{
        label: "G", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1716000, 
        capacity: 660, 
        winningBid: 1300000 
    },{
        label: "RS", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1897500, 
        capacity: 660, 
        winningBid: 1550000 
    }],

    "Nissan Dayz": [{ 
        label: "S", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1437700, 
        capacity: 660, 
        winningBid: 950000 
    },{
        label: "X", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1478400, 
        capacity: 660, 
        winningBid: 1250000 
    },{
        label: "Highway Star X", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1698400, 
        capacity: 660, 
        winningBid: 1300000 
    },{
        label: "Highway Star X ProPilot Edition", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1798500, 
        capacity: 660, 
        winningBid: 1550000 
    },{
        label: "Highway Star G Turbo", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1838100, 
        capacity: 660, 
        winningBid: 1300000 
    },{
        label: "Highway Star G Turbo ProPilot Edition", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1929400, 
        capacity: 660, 
        winningBid: 1550000 
    }],

    "EK Wagon": [{ 
        label:"M", 
        taxCategory:"petrol_under_1000", 
        taxbase:"1468500", 
        capacity: 660, 
        winningBid:"900000" 
    },{
        label:"G", 
        taxCategory:"petrol_under_1000", 
        taxbase:"1551000", 
        capacity: 660, 
        winningBid:"1100000"
    }],

    "Yaris": [{ 
        label: "X 1.0L", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1657700, 
        capacity: 996, 
        winningBid: 1450000 
    },{
        label: "G 1.0L", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1820500, 
        capacity: 996, 
        winningBid: 1600000
    }],

    "TAFT": [{ 
        label: "X", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1419000, 
        capacity: 660, 
        winningBid: 1100000 
    },{
        label: "X Turbo", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1512500, 
        capacity: 660, 
        winningBid: 1250000 
    },{
        label: "G", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1606000, 
        capacity: 660, 
        winningBid: 1300000 
    },{
        label: "G 'Chrome Venture'", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1672000, 
        capacity: 660, 
        winningBid: 1450000 
    },{
        label: "G 'Dark Chrome Venture'", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1677500, 
        capacity: 660, 
        winningBid: 1450000 
    },{
        label: "G Turbo", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1688500, 
        capacity: 660, 
        winningBid: 1450000 
    },{
        label: "G Turbo 'Chrome Venture'", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1754500, 
        capacity: 660, 
        winningBid: 1500000 
    },{
        label: "G Turbo 'Dark Chrome Venture'", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1760000, 
        capacity: 660, 
        winningBid: 1500000 
    }],
    
    // ¥109,000 category
    "Fit HV": [{ 
        label: "Basic",
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2208800, 
        capacity: 1496, 
        winningBid: 1300000 
    },{ 
        label: "Home",
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2404600, 
        capacity: 1496, 
        winningBid: 1620000 
    },{ 
        label: "RS",
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2616900, 
        capacity: 1496, 
        winningBid: 1800000 
    },{ 
        label: "Crosstar",
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2710400, 
        capacity: 1496, 
        winningBid: 1800000 
    },{ 
        label: "LUXE",
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2719200, 
        capacity: 1496, 
        winningBid: 2000000 
    }],

    "X bee": [{ 
        label: "Hybrid MX",
        taxCategory: "petrol_under_1000", 
        taxbase: 2212100, 
        capacity: 996, 
        winningBid: 1600000 
    },{ 
        label: "Hybrid MZ",
        taxCategory: "petrol_under_1000", 
        taxbase: 2388100, 
        capacity: 996, 
        winningBid: 1700000 
    }],

    "Hustler": [{ 
        label: "Hybrid G",
        taxCategory: "petrol_under_1000", 
        taxbase: 1518000, 
        capacity: 660, 
        winningBid: 1400000 
    }, { 
        label: "Hybrid X",
        taxCategory: "petrol_under_1000", 
        taxbase: 1672000, 
        capacity: 660, 
        winningBid: 1500000 
    }],

    "Aqua": [{ 
        label: "X",
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2486000, 
        capacity: 1496, 
        winningBid: 1700000 
    },{ 
        label: "G",
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2654300, 
        capacity: 1496, 
        winningBid: 2000000 
    },{ 
        label: "Z",
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2824800, 
        capacity: 1496, 
        winningBid: 2200000 
    }],

    "Swift": [{ 
        label: "XG",
        taxCategory: "petrol_1000_1300", 
        taxbase: 1727000, 
        capacity: 1196, 
        winningBid: 1200000 
    },{ 
        label: "Hybrid MX",
        taxCategory: "petrol_1000_1300", 
        taxbase: 1922800, 
        capacity: 1196, 
        winningBid: 1450000 
    }, { 
        label: "Hybrid MZ",
        taxCategory: "petrol_1000_1300", 
        taxbase: 2167000, 
        capacity: 1196, 
        winningBid: 1700000 
    }],

    "Note": [{ 
        label: "X 2WD",
        taxCategory: "hybrid_1000_1300", 
        taxbase: 2328700, 
        capacity: 1196, 
        winningBid: 1825000
    }],
    
    // ¥114,000 category
    "Raize": [{
        label: "X 1.0L",
        taxCategory: "petrol_under_1000",
        taxbase: 1800700,
        capacity: 996,
        winningBid: 1800000
    },{
        label: "G 1.0L",
        taxCategory: "petrol_under_1000",
        taxbase: 1958000,
        capacity: 996,
        winningBid: 2000000
    },{
        label: "Z 1.0L",
        taxCategory: "petrol_under_1000",
        taxbase: 2152700,
        capacity: 996,
        winningBid: 2500000
    },{
        label: "G 1.2L HV",
        taxCategory: "hev_50_100_1year",
        taxbase: 2263800,
        capacity: 78,
        winningBid: 2100000
    },{
        label: "Z 1.2L HV",
        taxCategory: "hev_50_100_1year",
        taxbase: 2442000,
        capacity: 78,
        winningBid: 2500000
    }],

    "Rocky": [{
        label: "L 1.0L",
        taxCategory: "petrol_under_1000",
        taxbase: 1761100,
        capacity: 996,
        winningBid: 1600000
    },{
        label: "X 1.0L",
        taxCategory: "petrol_under_1000",
        taxbase: 1910700,
        capacity: 996,
        winningBid: 1800000
    },{
        label: "Premium G 1.0L",
        taxCategory: "petrol_under_1000",
        taxbase: 2171400,
        capacity: 996,
        winningBid: 2000000
    },{
        label: "X HEV 1.2L",
        taxCategory: "hev_50_100_1year",
        taxbase: 2216500,
        capacity: 78,
        winningBid: 2100000
    },{
        label: "Premium G HEV 1.2L",
        taxCategory: "hev_50_100_1year",
        taxbase: 2460700,
        capacity: 78,
        winningBid: 2500000
    }],

    "Roomy": [{ 
        label: "X", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1742400, 
        capacity: 996, 
        winningBid: 1250000 
    },{
        label: "Custom G", 
        taxCategory: "petrol_under_1000", 
        taxbase: 2118600, 
        capacity: 996, 
        winningBid: 1400000
    },{
        label: "Custom GT (Turbo)", 
        taxCategory: "petrol_under_1000", 
        taxbase: 2257200, 
        capacity: 996, 
        winningBid: 1600000
    }],
    
    // ¥119,000 category
    "Axio": [{ 
        label: "EX", 
        taxCategory: "petrol_1300_1500", 
        taxbase: 2279200, 
        capacity: 1496, 
        winningBid: 1800000 
    }, { 
        label: "HYBRID EX", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 3077800, 
        capacity: 1496, 
        winningBid: 2500000 
    }],

    "Vezel HV": [{ 
        label: "e:HEV X HuNT", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 3108600, 
        capacity: 1496, 
        winningBid: 2500000 
    },{ 
        label: "e:HEV Z", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 3268100, 
        capacity: 1496, 
        winningBid: 3000000 
    },{
        label: "e:HEV Z Play", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 3699300, 
        capacity: 1496, 
        winningBid: 3500000 
    },{
        label: "e:HEV RS", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 3748800, 
        capacity: 1496, 
        winningBid: 3400000 
    }],

    "Yaris Cross": [{ 
        label: "Yaris Cross", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 129444, 
        capacity: 1496, 
        winningBid: 2800000 
    }],
    
    // ¥135,000 category
    "Leaf": [{ 
        label: "Leaf", 
        taxCategory: "hev_50_100_1year", 
        taxbase: 135000, 
        capacity: 60, 
        winningBid: 1800000
    }], // Electric - special category

    "Honda WR-V": [{ 
        label: "Honda WR-V", 
        taxCategory: "petrol_1300_1500", 
        taxbase: 135000, 
        capacity: 1500, 
        winningBid: 1900000 
    }],

    // ¥140,000 category
    "Corolla cross": [{ 
        label: "Corolla cross", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 144444, 
        capacity: 1878, 
        winningBid: 3500000 
    }],

    // ¥155,000 category
    "CR-V": [{ 
        label: "CR-V", 
        taxCategory: "petrol_1300_1500", 
        taxbase: 156666, 
        capacity: 2000, 
        winningBid: 2900000 
    }],
};

// Event Listeners
calculateBtn.addEventListener('click', calculateAndDisplay);
document.addEventListener('DOMContentLoaded', updateVehicleVariants);
vehicleSelect.addEventListener('change', updateVehicleVariants);
vehicleVariantSelect.addEventListener('change', applyVehicleVariant);
winningBidInput.addEventListener('input', calculateAndDisplay);
areaCostInput.addEventListener('input', calculateAndDisplay);
auctionFeeInput.addEventListener('input', calculateAndDisplay);
ttInput.addEventListener('input', calculateAndDisplay);
yenrateInput.addEventListener('input', calculateAndDisplay);
clearingInput.addEventListener('input', calculateAndDisplay);
capacityInput.addEventListener('input', calculateAndDisplay);
taxCategorySelect.addEventListener('change', calculateAndDisplay); // NEW
taxBaseInput.addEventListener('input', calculateAndDisplay);
exporterSelect.addEventListener('change', calculateAndDisplay);
downloadPdfBtn.addEventListener('click', generatePDF);

