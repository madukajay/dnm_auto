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
    if (winningBid < 2500000) {
        return 300000;
    } else if (winningBid < 3000000) {
        return 350000;
    } else if (winningBid < 3500000) {
        return 400000;
    } else if (winningBid < 4000000) {
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
            cidRate: 0.30, // 30%
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
            cidRate: 0.30, // 30%
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
            cidRate: 0.30, // 30%
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
            cidRate: 0.30, // 30%
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
            cidRate: 0.30, // 30%
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
            cidRate: 0.3, // 30%
            surchargeRate: 0.5, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 5000000,
            luxuryRate: 1.0 // 100%
        },
        // 1500cc < -- <1600cc Hybrid [HS Code: 8703.40.51]
        'hybrid_1500_1600': {
            getExciseDuty: (capacity) => {
                return capacity * 4800;
            },
            cidRate: 0.30, // 30%
            surchargeRate: 0.50, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 5500000,
            luxuryRate: 0.8 // 80%
        },
        // 1600cc < -- <1800cc Hybrid [HS Code: 8703.40.53]
        'hybrid_1600_1800': {
            getExciseDuty: (capacity) => {
                return capacity * 6300;
            },
            cidRate: 0.30, // 30%
            surchargeRate: 0.50, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 5500000,
            luxuryRate: 0.8 // 80%
        },
        // 1800cc < -- <2000cc Hybrid [HS Code: 8703.40.58]
        'hybrid_1800_2000': {
            getExciseDuty: (capacity) => {
                return capacity * 6900;
            },
            cidRate: 0.30, // 30%
            surchargeRate: 0.50, // 50% of CID
            vatRate: 0.18, // 18%
            luxuryThreshold: 5500000,
            luxuryRate: 0.8 // 80%
        },
        // HEV 50kW < -- < 100kW not more than 1yr old [HS Code: 8703.80.73]
        'hev_50_100_1year': {
            getExciseDuty: (capacity) => {
                return capacity * 40970;
            },
            cidRate: 0.3, // 30%
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
            cidRate: 0.3, // 30%
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

    // Calculate Surcharge - category-specific rate (toggle in Tax Breakdown column)
    const applySurcharge = surchargeToggle?.checked ?? true;
    const surcharge = applySurcharge ? cid * category.surchargeRate : 0;

    // Calculate SSCL base (CIF * 1.1 + excise duty + cid + surcharge)
    const ssclBase = (cif * 1.1) + exciseDuty + cid + surcharge;
    const sscl = ssclBase * parseFloat(ssclInput.value)/100; // SSCL at the specified rate

    // Calculate VAT base (SSCL base + SSCL) and then VAT at category-specific rate
    // const vatBase = ssclBase + sscl;
    const vatBase = ssclBase; // VAT is calculated on the base before adding SSCL, as per Sri Lankan tax rules
    const vat = vatBase * category.vatRate;

    // Calculate total tax
    const totalTax = luxuryTax + exciseDuty + cid + surcharge + sscl + vat + VEL + COM;

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
            sscl: parseFloat(sscl.toFixed(2)),
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
        1: { models: ["Alto", "Mira", "EK Wagon", "Wagon R", "Flair", "Move", "Nissan Dayz", "ROOX", "TAFT", "Yaris", "Spacia"], charge: 120000 },
        
        // ¥109,000 category
        2: { models: ["Fit HV", "X bee", "Hustler", "Aqua", "Swift", "Note"], charge: 126000 },
        
        // ¥114,000 category
        3: { models: ["Raize", "Rocky", "Roomy", "THOR"], charge: 132000 },
        
        // ¥119,000 category
        4: { models: ["Fielder", "Axio", "Audi A3", "Other sedan"], charge: 138000 },
        
        // ¥124,000 category
        5: { models: ["Sienta HV", "Freed HV"], charge: 144000 },
        
        // ¥129,000 category
        6: { models: ["C-HR", "Vezel HV", "Yaris Cross"], charge: 150000 },
        
        // ¥135,000 category
        7: { models: ["Leaf", "Honda WR-V", "Audi Q3"], charge: 156000 },
        
        // ¥140,000 category
        8: { models: ["Corolla cross"], charge: 162000 },
        
        // ¥145,000 category
        9: { models: ["Eclips cross", "Honda ZR-V"], charge: 168000 },
        
        // ¥150,000 category
        10: { models: ["Voxy HV", "Noah HV", "X-trail"], charge: 174000 },
        
        // ¥155,000 category
        11: { models: ["CR-V", "Step Wagon"], charge: 180000 },
        
        // ¥166,000 category
        12: { models: ["HIACE V", "NISSAN CARAVAN"], charge: 192000 },
        
        // ¥176,000 category
        13: { models: ["ALPHARD", "VELLFIRE"], charge: 204000 },
        
        // ¥186,000 category
        14: { models: ["Land Cruiser Prado"], charge: 216000 }
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
const ssclInput = document.getElementById('sscl');
const auctionFeeInput = document.getElementById('auctionFee');
const ttInput = document.getElementById('tt');
const yenrateInput = document.getElementById('yenrate');
const clearingInput = document.getElementById('clearing');
const calculateBtn = document.getElementById('calculateBtn');
const surchargeToggle = document.getElementById('surchargeToggle');
const surchargeToggleState = document.getElementById('surchargeToggleState');
const resultsContainer = document.getElementById('resultsContainer');
const taxBreakdown = document.getElementById('taxBreakdown');
const totalPayableElement = document.getElementById('totalPayable');
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
    
    const formatted = parseInt(value).toLocaleString('en-US');
    if (isYen) {
        valueEl.classList.add('result-value-jpy');
        valueEl.innerHTML = `<span class="currency-symbol">¥</span><span class="amount-num">${formatted}</span>`;
    } else if (isLKR) {
        valueEl.classList.add('result-value-lkr');
        valueEl.innerHTML = `<span class="currency-symbol">LKR</span><span class="amount-num">${formatted}</span>`;
    } else {
        valueEl.innerHTML = `<span class="currency-symbol">LKR</span><span class="amount-num">${formatted}</span>`;
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
            <div class="vehicle-meta">Category: ${shippingDetails.models.join(', ')}</div>
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
        cid: 'CID (30% of CIF)',
        surcharge: 'SUR (50% of CID)',
        sscl: 'SSCL (2.5%)',
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
        const bankCommission = lkrCif * 0.01; // Assuming 1% bank commission
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

        const totalTaxItem = document.createElement('div');
        totalTaxItem.className = 'tax-item tax-item-total';
        const totalTaxName = document.createElement('div');
        totalTaxName.className = 'tax-name';
        totalTaxName.textContent = 'Total Tax (LKR)';
        const totalTaxAmount = document.createElement('div');
        totalTaxAmount.className = 'tax-amount';
        totalTaxAmount.textContent = formatCurrency(totalTax, 'LKR');
        totalTaxItem.appendChild(totalTaxName);
        totalTaxItem.appendChild(totalTaxAmount);
        taxBreakdown.appendChild(totalTaxItem);
        
        // Update total payable
        totalPayableElement.innerHTML = `
            <span>Total Amount Payable:</span>
            <span>${formatCurrency(totalLKR, 'LKR')}</span>
        `;
        
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
        const bankCommission = lkrCif * 0.01; // Assuming 1% bank commission
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
        
        // Create PDF (theme matches website: dark glass + teal accents)
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        const pageW = 210;
        const margin = 15;
        const contentW = pageW - margin * 2;
        const refId = `${vehicle.replace(/\s+/g, '_')}_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${Math.floor(Math.random() * 10000)}`;

        const theme = {
            bg: [6, 8, 15],
            panel: [14, 18, 32],
            panelAlt: [20, 26, 44],
            border: [40, 48, 72],
            accent: [0, 229, 199],
            accentDim: [0, 80, 70],
            text: [232, 236, 244],
            muted: [139, 149, 173],
            jpy: [255, 179, 71],
            lkr: [94, 234, 212],
            purple: [99, 102, 241],
        };

        const fillPage = () => {
            doc.setFillColor(...theme.bg);
            doc.rect(0, 0, pageW, 297, 'F');
        };
        fillPage();

        const drawPanel = (x, y, w, h, accentBorder = false) => {
            doc.setFillColor(...theme.panel);
            doc.setDrawColor(...(accentBorder ? theme.accent : theme.border));
            doc.setLineWidth(accentBorder ? 0.4 : 0.25);
            doc.roundedRect(x, y, w, h, 3, 3, 'FD');
        };

        const drawSectionTitle = (title, y) => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(...theme.accent);
            doc.text(title, margin, y);
            doc.setDrawColor(...theme.border);
            doc.setLineWidth(0.2);
            doc.line(margin, y + 2, margin + contentW, y + 2);
            return y + 8;
        };

        const drawBullet = (x, y) => {
            doc.setFillColor(...theme.accent);
            doc.circle(x, y, 1.2, 'F');
        };

        // Top accent bar (shimmer line)
        doc.setFillColor(...theme.accent);
        doc.rect(0, 0, pageW, 2.5, 'F');
        doc.setFillColor(...theme.purple);
        doc.rect(pageW * 0.45, 0, pageW * 0.2, 2.5, 'F');

        // Header panel
        drawPanel(margin, 8, contentW, 32, true);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(...theme.text);
        doc.text('DNM AUTO', margin + 8, 20);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...theme.muted);
        doc.text('Vehicle Import Specialists  ·  Japan → Sri Lanka', margin + 8, 27);
        doc.setFontSize(9);
        doc.text('Newtown, Embilipitiya | School Lane, Rukmalgama, Kottawa', margin + 8, 33);
        doc.text('Tel: 077 847 2900 | 071 346 6099', margin + 8, 38);

        // Document title block
        let yPos = 48;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(...theme.text);
        doc.text('IMPORT COST QUOTATION', pageW / 2, yPos, { align: 'center' });
        yPos += 7;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...theme.muted);
        doc.text(`Generated: ${dateStr} at ${timeStr}`, pageW / 2, yPos, { align: 'center' });
        yPos += 5;
        doc.text(`Reference: ${refId}`, pageW / 2, yPos, { align: 'center' });

        // Vehicle information
        yPos += 10;
        yPos = drawSectionTitle('VEHICLE INFORMATION', yPos);
        const vehicleBoxH = 32;
        drawPanel(margin, yPos, contentW, vehicleBoxH, true);
        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...theme.text);
        const infoY = yPos + 8;
        drawBullet(margin + 6, infoY - 1.5);
        doc.text(`Vehicle Model: ${vehicle}`, margin + 10, infoY);
        drawBullet(margin + 6, infoY + 6.5);
        doc.text(`Year & Grade: ${vehicleYear} ${modelGrade}`, margin + 10, infoY + 8);
        drawBullet(margin + 6, infoY + 14);
        doc.text(`Mileage: < ${mileage} km`, margin + 10, infoY + 16);
        drawBullet(margin + 98, infoY - 1.5);
        doc.text(`Engine Capacity: ${capacity} cc`, margin + 102, infoY);
        drawBullet(margin + 98, infoY + 6.5);
        doc.text(`Auction Grade: ${auctionGrade}`, margin + 102, infoY + 8);
        drawBullet(margin + 98, infoY + 14);
        doc.setTextColor(...theme.muted);
        doc.text('Approximate Delivery: 8 - 10 Weeks', margin + 102, infoY + 16);
        yPos += vehicleBoxH + 10;

        // Cost breakdown
        yPos = drawSectionTitle(`COST BREAKDOWN  (JPY Rate: ${yenrate})`, yPos);
        const tableHeaderH = 9;
        doc.setFillColor(...theme.accentDim);
        doc.setDrawColor(...theme.accent);
        doc.setLineWidth(0.3);
        doc.roundedRect(margin, yPos, contentW, tableHeaderH, 2, 2, 'FD');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...theme.accent);
        doc.text('Description', margin + 6, yPos + 6);
        doc.text('Amount', margin + contentW - 6, yPos + 6, { align: 'right' });
        yPos += tableHeaderH + 2;

        let rowIndex = 0;
        function addCostRow(description, amount, isYen = false, isHighlight = false) {
            const rowH = isHighlight ? 10 : 8;
            if (isHighlight) {
                doc.setFillColor(...theme.accentDim);
                doc.setDrawColor(...theme.accent);
            } else if (rowIndex % 2 === 0) {
                doc.setFillColor(...theme.panelAlt);
                doc.setDrawColor(...theme.border);
            } else {
                doc.setFillColor(...theme.panel);
                doc.setDrawColor(...theme.border);
            }
            doc.setLineWidth(0.15);
            doc.rect(margin, yPos, contentW, rowH, 'FD');

            doc.setFont('helvetica', isHighlight ? 'bold' : 'normal');
            doc.setFontSize(isHighlight ? 10 : 9);
            doc.setTextColor(...(isHighlight ? theme.text : theme.muted));
            if (!isHighlight) {
                drawBullet(margin + 5, yPos + rowH / 2);
            }
            doc.setTextColor(...theme.text);
            doc.text(description, margin + (isHighlight ? 6 : 10), yPos + rowH / 2 + 1.5);

            const formattedAmount = isYen
                ? `¥ ${parseInt(amount).toLocaleString('en-US')}`
                : `LKR ${parseInt(amount).toLocaleString('en-US')}`;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(isHighlight ? 10.5 : 10);
            const amountColor = isYen ? theme.jpy : (isHighlight ? theme.accent : theme.lkr);
            doc.setTextColor(...amountColor);
            doc.text(formattedAmount, margin + contentW - 6, yPos + rowH / 2 + 1.5, { align: 'right' });

            yPos += rowH;
            rowIndex++;
        }

        addCostRow('Winning Bid', winningBid, true);
        addCostRow('Handling and Shipping Charges', handling + shipping, true);
        addCostRow('Area Cost', AreaCost, true);
        addCostRow('CIF Discount', -TT, true);
        addCostRow('CIF Value (JPY)', cif, true);
        yPos += 3;
        addCostRow('Auction Deposit and Insurance', auctionFee + lkrTT, false);
        addCostRow('CIF (LKR) - LC Amount', lkrCif, false);
        addCostRow('Bank Commission', bankCommission, false);
        addCostRow('Clearing Charges', clearing, false);
        yPos += 3;
        addCostRow('TOTAL CUSTOMS TAX', totalTax, false, true);
        yPos += 6;

        // Total payable (matches website hero total card)
        const totalBoxH = 26;
        doc.setFillColor(...theme.panel);
        doc.setDrawColor(...theme.accent);
        doc.setLineWidth(0.6);
        doc.roundedRect(margin, yPos, contentW, totalBoxH, 3, 3, 'FD');
        doc.setFillColor(...theme.accentDim);
        doc.roundedRect(margin + 1, yPos + 1, contentW - 2, totalBoxH - 2, 2.5, 2.5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...theme.text);
        doc.text('TOTAL AMOUNT PAYABLE', pageW / 2, yPos + 10, { align: 'center' });
        doc.setFontSize(18);
        doc.setTextColor(...theme.lkr);
        doc.text(`LKR ${parseInt(totalLKR).toLocaleString('en-US')}`, pageW / 2, yPos + 19, { align: 'center' });
        yPos += totalBoxH + 14;

        // Footer
        doc.setDrawColor(...theme.border);
        doc.setLineWidth(0.3);
        doc.line(margin, yPos, margin + contentW, yPos);
        yPos += 8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...theme.muted);
        doc.text('This quotation is valid for 7 days from the date of issue.', pageW / 2, yPos, { align: 'center' });
        doc.text('Prices may change with exchange rates and government tax revisions.', pageW / 2, yPos + 4, { align: 'center' });
        doc.setTextColor(...theme.accent);
        doc.text('© 2025 DNM AUTO · For reference only', pageW / 2, yPos + 9, { align: 'center' });

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

    "Flair": [{ 
        label: "G", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1455300, 
        capacity: 660, 
        winningBid: 1200000 
    },{
        label: "Hybrid XG", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1478400, 
        capacity: 660, 
        winningBid: 1150000 
    },
    {
        label: "Hybrid XS", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1733600, 
        capacity: 660, 
        winningBid: 1500000 
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

    "ROOX": [{ 
        label: "S", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1672000, 
        capacity: 660, 
        winningBid: 950000 
    },{
        label: "X", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1739100, 
        capacity: 660, 
        winningBid: 1150000 
    },{
        label: "Highway Star X", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1919500, 
        capacity: 660, 
        winningBid: 1300000 
    },{
        label: "Highway Star X ProPilot Edition", 
        taxCategory: "petrol_under_1000", 
        taxbase: 2105400, 
        capacity: 660, 
        winningBid: 1550000 
    },{
        label: "Highway Star G Turbo", 
        taxCategory: "petrol_under_1000", 
        taxbase: 2159300, 
        capacity: 660, 
        winningBid: 1300000 
    },{
        label: "Highway Star G Turbo ProPilot Edition", 
        taxCategory: "petrol_under_1000", 
        taxbase: 2249500, 
        capacity: 660, 
        winningBid: 1550000 
    }],

    "Spacia": [{ 
        label: "HYBRID G", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1530100, 
        capacity: 657, 
        winningBid: 1050000 
    },{
        label: "HYBRID X", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1705000, 
        capacity: 657, 
        winningBid: 1100000
    },{
        label: "Custom HYBRID GS", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1801800, 
        capacity: 657, 
        winningBid: 1200000
    },{
        label: "Custom HYBRID XS", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1995400, 
        capacity: 657, 
        winningBid: 1300000
    },{
        label: "Custom HYBRID XS TURBO", 
        taxCategory: "petrol_under_1000", 
        taxbase: 2073500, 
        capacity: 657, 
        winningBid: 1500000
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
        taxbase: 2079000,
        capacity: 996,
        winningBid: 1800000
    },{
        label: "G 1.0L",
        taxCategory: "petrol_under_1000",
        taxbase: 2235200,
        capacity: 996,
        winningBid: 2000000
    },{
        label: "Z 1.0L",
        taxCategory: "petrol_under_1000",
        taxbase: 2413400,
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
        taxbase: 2039400,
        capacity: 996,
        winningBid: 1600000
    },{
        label: "X 1.0L",
        taxCategory: "petrol_under_1000",
        taxbase: 2187900,
        capacity: 996,
        winningBid: 1800000
    },{
        label: "Premium G 1.0L",
        taxCategory: "petrol_under_1000",
        taxbase: 2432100,
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
        label: "G", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1939300, 
        capacity: 996, 
        winningBid: 1300000
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

    "THOR": [{ 
        label: "X", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1742400, 
        capacity: 996, 
        winningBid: 1250000 
    },{
        label: "G", 
        taxCategory: "petrol_under_1000", 
        taxbase: 1939300, 
        capacity: 996, 
        winningBid: 1300000
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
        label: "HYBRID EX (NKE165)", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2176900, 
        capacity: 1496, 
        winningBid: 2500000 
    }],

    "Audi A3": [{ 
        label: "TFSI Adv (3AA-GYDLA)", 
        taxCategory: "petrol_under_1000", 
        taxbase: 3869800, 
        capacity: 999, 
        winningBid: 2300000 
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
        label: "X", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2433200, 
        capacity: 1496, 
        winningBid: 2000000 
    },{ 
        label: "G", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2546500, 
        capacity: 1496, 
        winningBid: 2250000 
    },{ 
        label: "Z", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2887500, 
        capacity: 1496, 
        winningBid: 2500000 
    },{ 
        label: "Z URBANO", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 2997500, 
        capacity: 1496, 
        winningBid: 2650000 
    },{ 
        label: "Z Adventure", 
        taxCategory: "hybrid_1300_1500", 
        taxbase: 3003000, 
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
        label: "G", 
        taxCategory: "hybrid_1600_1800", 
        taxbase: 2760000, 
        capacity: 1796, 
        winningBid: 2500000
    },{ 
        label: "S", 
        taxCategory: "hybrid_1600_1800", 
        taxbase: 2980000, 
        capacity: 1796, 
        winningBid: 2700000
    },{ 
        label: "Z", 
        taxCategory: "hybrid_1600_1800", 
        taxbase: 3430000, 
        capacity: 1796, 
        winningBid: 3000000
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
function updateSurchargeToggleLabel() {
    if (!surchargeToggleState) return;
    surchargeToggleState.textContent = surchargeToggle?.checked ? 'On' : 'Off';
}

calculateBtn.addEventListener('click', calculateAndDisplay);
surchargeToggle?.addEventListener('change', () => {
    updateSurchargeToggleLabel();
    calculateAndDisplay();
});
updateSurchargeToggleLabel();
document.addEventListener('DOMContentLoaded', updateVehicleVariants);
vehicleSelect.addEventListener('change', updateVehicleVariants);
vehicleVariantSelect.addEventListener('change', applyVehicleVariant);
winningBidInput.addEventListener('input', calculateAndDisplay);
areaCostInput.addEventListener('input', calculateAndDisplay);
ssclInput.addEventListener('input', calculateAndDisplay);
auctionFeeInput.addEventListener('input', calculateAndDisplay);
ttInput.addEventListener('input', calculateAndDisplay);
yenrateInput.addEventListener('input', calculateAndDisplay);
clearingInput.addEventListener('input', calculateAndDisplay);
capacityInput.addEventListener('input', calculateAndDisplay);
taxCategorySelect.addEventListener('change', calculateAndDisplay); // NEW
taxBaseInput.addEventListener('input', calculateAndDisplay);
exporterSelect.addEventListener('change', calculateAndDisplay);
downloadPdfBtn.addEventListener('click', generatePDF);

