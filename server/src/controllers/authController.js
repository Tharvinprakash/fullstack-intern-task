const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../../config/db");

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password && password.length >= 6;
};

const validateName = (name) => {
    return name && name.trim().length >= 2 && name.trim().length <= 50;
};

const validateRegisterInput = (name, email, password) => {
    const errors = [];
    
    if (!validateName(name)) {
        errors.push("Name must be between 2 and 50 characters");
    }
    
    if (!validateEmail(email)) {
        errors.push("Please provide a valid email address");
    }
    
    if (!validatePassword(password)) {
        errors.push("Password must be at least 6 characters long");
    }
    
    return errors;
};

const validateLoginInput = (email, password) => {
    const errors = [];
    
    if (!email || !email.trim()) {
        errors.push("Email is required");
    }
    
    if (!password) {
        errors.push("Password is required");
    }
    
    return errors;
};

async function register(name, email, password) {
    const validationErrors = validateRegisterInput(name, email, password);
    if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(", "));
    }
    
    const existingUser = await knex("users").where({ email }).first();
    if (existingUser) {
        throw new Error("User already exists with this email");
    }
    
    const hashed = await bcrypt.hash(password, 10);
    await knex("users").insert({ 
        name: name.trim(), 
        email: email.trim().toLowerCase(), 
        password: hashed 
    });
    
    return { 
        success: true,
        message: "User registered successfully!" 
    };
}

async function login(email, password) {
    const validationErrors = validateLoginInput(email, password);
    if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(", "));
    }
    
    const user = await knex("users").where({ email: email.trim().toLowerCase() }).first();
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ 
        userId: user.id,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: "24h", 
    });

    return { 
        success: true,
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required: name, email, password" 
            });
        }
        
        const response = await register(name, email, password);
        res.status(201).json(response);
    } catch (err) {
        console.error("Registration error:", err.message);
        res.status(400).json({ 
            success: false,
            message: err.message 
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Email and password are required" 
            });
        }
        
        const response = await login(email, password);
        res.json(response);
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(400).json({ 
            success: false,
            message: err.message 
        });
    }
};

exports.validation = {
    validateEmail,
    validatePassword,
    validateName,
    validateRegisterInput,
    validateLoginInput
};