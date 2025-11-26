# Folder Structure Optimization Plan

## Current Issues
1. **Duplicate Components**: 3 case form versions (CompleteCaseForm, CompleteCaseFormOptimized, EssentialCaseForm)
2. **Static Mock Data**: Unused mock data files in `/data` folder
3. **API Inconsistency**: Mixed API structure and naming
4. **Component Bloat**: Large components that could be modularized
5. **Unused Files**: Multiple versions of same functionality

## Optimized Structure

```
src/
├── api/                          # Consolidated API layer
│   ├── index.js                  # API client configuration
│   ├── endpoints/                # API endpoint definitions
│   │   ├── appointments.js       # All appointment-related APIs
│   │   ├── auth.js              # Authentication APIs
│   │   └── slots.js             # Slot management APIs
│   └── types.js                 # API response types
│
├── components/                   # Reusable UI components
│   ├── ui/                      # Basic UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Card.jsx
│   ├── forms/                   # Form-specific components
│   │   ├── CaseForm/           # Single optimized case form
│   │   │   ├── index.jsx       # Main form component
│   │   │   ├── steps/          # Form steps
│   │   │   ├── hooks/          # Form logic
│   │   │   └── config/         # Form configuration
│   │   └── BookingForm/        # Booking form components
│   └── layout/                 # Layout components
│       ├── Header.jsx
│       ├── Sidebar.jsx
│       └── Layout.jsx
│
├── features/                    # Feature-based organization
│   ├── appointments/           # Appointment management
│   │   ├── components/         # Feature-specific components
│   │   ├── hooks/             # Feature-specific hooks
│   │   ├── services/          # Business logic
│   │   └── types.js           # Feature types
│   ├── admin/                 # Admin functionality
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── booking/               # Booking functionality
│       ├── components/
│       ├── hooks/
│       └── services/
│
├── hooks/                      # Global custom hooks
│   ├── useAuth.js
│   ├── useApi.js
│   └── useLocalStorage.js
│
├── store/                      # State management
│   ├── index.js               # Store configuration
│   ├── slices/               # Redux slices
│   │   ├── auth.js
│   │   ├── appointments.js
│   │   └── ui.js
│   └── middleware/           # Custom middleware
│
├── utils/                      # Utility functions
│   ├── constants.js           # App constants
│   ├── helpers.js            # Helper functions
│   ├── validation.js         # Validation utilities
│   └── storage.js            # Storage utilities
│
├── pages/                      # Page components
│   ├── AppointmentBooking.jsx
│   ├── AdminDashboard.jsx
│   └── Login.jsx
│
└── App.jsx                     # Main app component
```

## Files to Remove
- `src/data/` (entire folder - mock data)
- `src/components/caseForm/CompleteCaseForm.jsx` (keep optimized version)
- `src/components/caseForm/EssentialCaseForm.jsx` (merge into main)
- Duplicate API files with similar functionality

## Files to Consolidate
- Merge all appointment APIs into single file
- Combine similar Redux slices
- Consolidate validation utilities
- Merge duplicate form components

## Benefits
1. **Single Responsibility**: Each folder has clear purpose
2. **Feature-Based**: Related code grouped together
3. **Scalable**: Easy to add new features
4. **Maintainable**: Reduced duplication
5. **Performance**: Smaller bundle sizes