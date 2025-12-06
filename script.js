// Business Logic Functions

/**
 * Calculate auction fee based on winning bid
 * @param {number} winningBid - Winning bid amount in JPY
 * @returns {number} Auction fee in JPY
 */
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
function calculateCharges(winningBid) {
    // Input validation
    if (typeof winningBid !== 'number' || winningBid < 0) {
        throw new Error('Winning bid must be a positive number');
    }

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
}

/**
 * Calculate all taxes for imported vehicle based on CIF value in LKR, tax category, and capacity
 * @param {number} cif - CIF value in LKR (Sri Lankan Rupees)
 * @param {string} taxCategory - Tax category identifier
 * @param {number} capacity - Engine capacity in cc
 * @returns {object} Object containing all tax components and total tax
 */
function calculateVehicleTax(cif, taxCategory, capacity) {
    // Input validation
    if (typeof cif !== 'number' || cif < 0) {
        throw new Error('CIF must be a positive number');
    }
    
    if (typeof capacity !== 'number' || capacity < 0) {
        throw new Error('Capacity must be a positive number');
    }

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
            luxuryTax: parseFloat(luxuryTax.toFixed(2)),
            exciseDuty: parseFloat(exciseDuty.toFixed(2)),
            cid: parseFloat(cid.toFixed(2)),
            surcharge: parseFloat(surcharge.toFixed(2)),
            vat: parseFloat(vat.toFixed(2)),
            vel: VEL,
            com: COM
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
        1: { models: ["Wagon R", "Alto", "Mira", "Yaris", "Move", "EK Wagon"], charge: 103000 },
        
        // ¥109,000 category
        2: { models: ["Fit HV", "X bee", "Hustler", "Aqua", "Swift", "Note"], charge: 109000 },
        
        // ¥114,000 category
        3: { models: ["Raize", "Rocky", "Roomy"], charge: 114000 },
        
        // ¥119,000 category
        4: { models: ["Fielder", "Axio", "Other sedan"], charge: 119000 },
        
        // ¥124,000 category
        5: { models: ["Sienta HV", "Freed HV"], charge: 124000 },
        
        // ¥129,000 category
        6: { models: ["C-HR", "Vezel HV"], charge: 129000 },
        
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
const winningBidInput = document.getElementById('winningBid');
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

// Vehicle default settings mapping
const vehicleDefaults = {
    // ¥103,000 category
    "Wagon R": { taxCategory: "petrol_under_1000", capacity: 660, winningBid: 1000000 },
    "Alto": { taxCategory: "petrol_under_1000", capacity: 660, winningBid: 900000 },
    "Mira": { taxCategory: "petrol_under_1000", capacity: 660, winningBid: 900000 },
    "Move": { taxCategory: "petrol_under_1000", capacity: 660, winningBid: 1200000 },
    "EK Wagon": { taxCategory: "petrol_under_1000", capacity: 660, winningBid: 850000 },
    "Yaris": { taxCategory: "petrol_under_1000", capacity: 1000, winningBid: 1500000 },
    
    // ¥109,000 category
    "Fit HV": { taxCategory: "hybrid_1300_1500", capacity: 1300, winningBid: 1500000 },
    "X bee": { taxCategory: "petrol_under_1000", capacity: 660, winningBid: 900000 },
    "Hustler": { taxCategory: "hybrid_under_1000", capacity: 660, winningBid: 1000000 },
    "Aqua": { taxCategory: "hybrid_1300_1500", capacity: 1500, winningBid: 1400000 },
    "Swift": { taxCategory: "petrol_1000_1300", capacity: 1300, winningBid: 1600000 },
    "Note": { taxCategory: "hybrid_1000_1300", capacity: 1500, winningBid: 1300000 },
    
    // ¥114,000 category
    "Raize": { taxCategory: "hev_50_100_1year", capacity: 1000, winningBid: 2500000 },
    "Rocky": { taxCategory: "hev_50_100_1year", capacity: 1000, winningBid: 2400000 },
    "Roomy": { taxCategory: "petrol_under_1000", capacity: 660, winningBid: 1500000 },
    
    // ¥119,000 category
    "Fielder": { taxCategory: "hybrid_1000_1300", capacity: 1800, winningBid: 1800000 },
    "Axio": { taxCategory: "petrol_1000_1300", capacity: 1500, winningBid: 1600000 },
    "Other sedan": { taxCategory: "petrol_1300_1500", capacity: 2000, winningBid: 2000000 },
    
    // ¥124,000 category
    "Sienta HV": { taxCategory: "hybrid_1300_1500", capacity: 1500, winningBid: 1800000 },
    "Freed HV": { taxCategory: "hybrid_1300_1500", capacity: 1500, winningBid: 1700000 },
    
    // ¥129,000 category
    "C-HR": { taxCategory: "hybrid_1000_1300", capacity: 1800, winningBid: 2200000 },
    "Vezel HV": { taxCategory: "hybrid_1300_1500", capacity: 1500, winningBid: 2800000 },
    
    // ¥135,000 category
    "Leaf": { taxCategory: "hev_50_100_1year", capacity: 0, winningBid: 1800000 }, // Electric - special category
    "Honda WR-V": { taxCategory: "petrol_1300_1500", capacity: 1500, winningBid: 1900000 },
    "Audi Q3": { taxCategory: "petrol_1300_1500", capacity: 2000, winningBid: 3000000 },
    
    // ¥140,000 category
    "Corolla cross": { taxCategory: "hybrid_1300_1500", capacity: 1800, winningBid: 2500000 },
    
    // ¥145,000 category
    "Eclips cross": { taxCategory: "petrol_1300_1500", capacity: 2000, winningBid: 2300000 },
    "Honda ZR-V": { taxCategory: "hybrid_1300_1500", capacity: 2000, winningBid: 2400000 },
    
    // ¥150,000 category
    "Voxy HV": { taxCategory: "hybrid_1300_1500", capacity: 2000, winningBid: 2800000 },
    "Noah HV": { taxCategory: "hybrid_1300_1500", capacity: 2000, winningBid: 2700000 },
    "X-trail": { taxCategory: "petrol_1300_1500", capacity: 2000, winningBid: 2600000 },
    
    // ¥155,000 category
    "CR-V": { taxCategory: "petrol_1300_1500", capacity: 2000, winningBid: 2900000 },
    "Step Wagon": { taxCategory: "hybrid_1300_1500", capacity: 2000, winningBid: 3000000 },
    
    // ¥166,000 category
    "HIACE V": { taxCategory: "petrol_1300_1500", capacity: 2700, winningBid: 3500000 }, // Diesel - special category
    "NISSAN CARAVAN": { taxCategory: "petrol_1300_1500", capacity: 2800, winningBid: 3200000 },
    
    // ¥176,000 category
    "ALPHARD": { taxCategory: "hybrid_1300_1500", capacity: 2500, winningBid: 4500000 },
    "VELLFIRE": { taxCategory: "hybrid_1300_1500", capacity: 2500, winningBid: 4400000 },
    
    // ¥186,000 category
    "Land Cruiser Prado": { taxCategory: "petrol_1300_1500", capacity: 3000, winningBid: 5000000 }
};

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
    } else {
        // Default values if vehicle not in mapping
        taxCategorySelect.value = "hybrid_1300_1500";
        capacityInput.value = 1500;
        winningBidInput.value = 2000000;
    }
    
    // Trigger calculation
    calculateAndDisplay();
}

// Helper function to format tax names
function formatTaxName(key) {
    const names = {
        luxuryTax: 'Luxury Tax',
        exciseDuty: 'Excise Duty',
        cid: 'CID (20% of CIF)',
        surcharge: 'SUR (50% of CID)',
        vat: 'VAT (18%)',
        vel: 'Vehicle Emission Levy',
        com: 'COM/EXM/SEL'
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

function updateVehicleDefaults() {
    const selectedVehicle = vehicleSelect.value;
    const defaults = vehicleDefaults[selectedVehicle];
    
    if (defaults) {
        // Update tax category
        taxCategorySelect.value = defaults.taxCategory;
        
        // Update capacity
        capacityInput.value = defaults.capacity;
        
        // Update winning bid
        winningBidInput.value = defaults.winningBid;
        
        // Trigger calculation
        calculateAndDisplay();
    }
}

// Calculate and display results
function calculateAndDisplay() {
    try {
        // Get input values
        const vehicle = vehicleSelect.value;
        const winningBid = parseFloat(winningBidInput.value);
        const TT = parseFloat(ttInput.value);
        const yenrate = parseFloat(yenrateInput.value);
        const clearing = parseFloat(clearingInput.value);
        const taxCategory = taxCategorySelect.value; // NEW: Get tax category
        const capacity = parseFloat(capacityInput.value);
        const AreaCost = 5000; // Fixed value
        
        // Validate inputs
        if (!vehicle || isNaN(winningBid) || isNaN(TT) || isNaN(yenrate) || isNaN(clearing) || isNaN(capacity)) {
            alert('Please fill in all fields with valid numbers');
            return;
        }
        
        // Get shipping charges
        const shippingDetails = getShippingCharges(vehicle);
        const shipping = shippingDetails.charge;
        
        // Calculate other charges
        const handling = calculateCharges(winningBid);
        const auctionFee = getAuctionFee(winningBid);
        
        // Calculate CIF
        const cif = (winningBid + shipping + handling - TT + AreaCost);
        const lkrCif = cif * yenrate;
        const bankCommission = lkrCif * 0.005;
        const LC = lkrCif + bankCommission;
        const lkrTT = TT * (yenrate + 0.01);
        
        // Calculate taxes
        const taxDetails = calculateVehicleTax(lkrCif, taxCategory, capacity); // Updated
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
        // Get current values
        const vehicle = vehicleSelect.value;
        const winningBid = parseFloat(winningBidInput.value);
        const TT = parseFloat(ttInput.value);
        const yenrate = parseFloat(yenrateInput.value);
        const clearing = parseFloat(clearingInput.value);
        const taxCategory = taxCategorySelect.value;
        const capacity = parseFloat(capacityInput.value);
        
        // Recalculate to get current values
        const shippingDetails = getShippingCharges(vehicle);
        const shipping = shippingDetails.charge;
        const handling = calculateCharges(winningBid);
        const auctionFee = getAuctionFee(winningBid);
        const AreaCost = 5000;
        const cif = (winningBid + shipping + handling - TT + AreaCost);
        const lkrCif = cif * yenrate;
        const bankCommission = lkrCif * 0.005;
        const LC = lkrCif + bankCommission;
        const lkrTT = TT * (yenrate + 0.01);
        const taxDetails = calculateVehicleTax(lkrCif, taxCategory, capacity);
        const totalTax = taxDetails.totalTax;
        const totalLKR = auctionFee + lkrTT + LC + totalTax + clearing;
        
        // Create PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Set font
        doc.setFont("helvetica");
        
        // Title
        doc.setFontSize(20);
        doc.setTextColor(26, 58, 143);
        doc.text("VEHICLE IMPORT COST BREAKDOWN", 105, 20, null, null, 'center');
        
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text("Generated on: " + new Date().toLocaleDateString(), 105, 28, null, null, 'center');
        
        // Separator line
        doc.setDrawColor(26, 58, 143);
        doc.setLineWidth(0.5);
        doc.line(20, 32, 190, 32);
        
        // Vehicle Information Section
        doc.setFontSize(14);
        doc.setTextColor(26, 58, 143);
        doc.text("VEHICLE INFORMATION", 20, 42);
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Vehicle Model: ${vehicle}`, 20, 50);
        doc.text(`Engine Capacity: ${capacity} cc`, 20, 56);
        doc.text(`Tax Category: ${taxCategorySelect.options[taxCategorySelect.selectedIndex].text}`, 20, 62);
        doc.text(`Exchange Rate: 1 JPY = ${yenrate} LKR`, 20, 68);
        
        // Cost Details Section
        doc.setFontSize(14);
        doc.setTextColor(26, 58, 143);
        doc.text("COST BREAKDOWN", 20, 80);
        
        // Create a table for costs
        let yPos = 88;
        
        // Helper function to add table rows
        function addRow(label, value, isYen = false, isLKR = false) {
            const formattedValue = isYen ? `¥${parseInt(value).toLocaleString()}` : 
                             isLKR ? `LKR ${parseInt(value).toLocaleString()}` : 
                             `LKR ${parseInt(value).toLocaleString()}`;
            
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(label, 20, yPos);
            
            doc.setFontSize(10);
            doc.setTextColor(isYen ? 211 : (isLKR ? 26 : 0), 
                           isYen ? 47 : (isLKR ? 143 : 0), 
                           isYen ? 38 : (isLKR ? 74 : 0));
            doc.text(formattedValue, 150, yPos, null, null, 'right');
            
            yPos += 6;
        }
        
        // Add all cost items
        addRow('Winning Bid', winningBid, true);
        addRow('Shipping Charges', shipping, true);
        addRow('Handling Charges', handling, true);
        addRow('TT Deduction', -TT, true);
        addRow('Area Cost', AreaCost, true);
        addRow('CIF Value (JPY)', cif, true);
        addRow('Auction Fee', auctionFee, false, true);
        addRow('CIF (LKR) - LC Amount', lkrCif, false, true);
        addRow('Bank Commission', bankCommission, false, true);
        addRow('TT Amount (LKR)', lkrTT, false, true);
        addRow('Clearing Charges', clearing, false, true);
        yPos += 2;
        
        // Tax Breakdown Section
        // doc.setFontSize(14);
        // doc.setTextColor(26, 58, 143);
        // doc.text("TAX BREAKDOWN", 20, yPos + 10);
        // yPos += 18;
        
        // // Add tax items
        // for (const [key, value] of Object.entries(taxDetails.taxComponents)) {
        //     const taxName = formatTaxName(key);
        //     addRow(taxName, value, false, true);
        // }
        
        // // Totals
        // yPos += 10;
        // doc.setDrawColor(26, 58, 143);
        // doc.setLineWidth(0.3);
        // doc.line(20, yPos, 190, yPos);
        // yPos += 8;
        
        // Total Tax
        doc.setFontSize(12);
        doc.setTextColor(26, 58, 143);
        doc.text('Total Tax (LKR):', 20, yPos);
        doc.setTextColor(26, 58, 143);
        doc.text(`LKR ${parseInt(totalTax).toLocaleString()}`, 150, yPos, null, null, 'right');
        
        yPos += 20;
        
        // Total Payable
        doc.setFontSize(16);
        doc.setTextColor(26, 143, 74);
        doc.text('TOTAL AMOUNT PAYABLE:', 20, yPos);
        doc.text(`LKR ${parseInt(totalLKR).toLocaleString()}`, 150, yPos, null, null, 'right');
        
        // Footer
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text("© 2025 Vehicle Import Calculator | Calculations are for reference purposes only", 105, 275, null, null, 'center');
        doc.text("Exchange rates and tax regulations may vary", 105, 280, null, null, 'center');
        doc.text("DNM Auto | 077 847 2900 | 071 346 6099", 105, 285, null, null, 'center');
        
        // Save the PDF
        doc.save(`Vehicle_Import_${vehicle.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`);
        
    } catch (error) {
        alert(`Error generating PDF: ${error.message}`);
        console.error(error);
    }
}

// Event Listeners
calculateBtn.addEventListener('click', calculateAndDisplay);
document.addEventListener('DOMContentLoaded', updateVehicleDefaults);
vehicleSelect.addEventListener('change', updateVehicleDefaults);
winningBidInput.addEventListener('input', calculateAndDisplay);
ttInput.addEventListener('input', calculateAndDisplay);
yenrateInput.addEventListener('input', calculateAndDisplay);
clearingInput.addEventListener('input', calculateAndDisplay);
capacityInput.addEventListener('input', calculateAndDisplay);
taxCategorySelect.addEventListener('change', calculateAndDisplay); // NEW
downloadPdfBtn.addEventListener('click', generatePDF);