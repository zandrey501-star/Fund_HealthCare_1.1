
## 3. Key Participants and Their Functions

- **Patient** – Consumer of medical services; receives care, pays premiums and out-of-pocket costs.
- **Insurance Company** – Provides medical insurance plans, manages financial risk, processes claims, and negotiates provider rates.
- **Government (CMS, state agencies)** – Regulates the system (e.g., HIPAA), administers public programs (Medicare, Medicaid), and sets quality standards.
- **Employer** – Often sponsors and partially funds group health insurance for employees; selects plans and transmits enrollment data to insurers.
- **Healthcare Provider (Clinic, Hospital, Physician)** – Delivers medical services, bills insurers or patients, and documents clinical care.
- **Pharmacy** – Dispenses prescription drugs and processes claims via pharmacy benefit managers.
- **Pharmaceutical Company** – Develops, manufactures, and sells drugs; negotiates formularies and rebates with insurers.
- **Pharmacy Benefit Manager (PBM)** – Manages prescription drug benefits for insurers and employers; negotiates with pharmacies and drug companies.
- **Third‑Party Administrator (TPA)** – Handles administrative tasks (e.g., claims processing, enrollment) for self‑insured employers or insurers.
- **Clearinghouse** – Translates and routes electronic claims, enrollment, and payment data between providers, insurers, and other entities in HIPAA‑compliant formats.
- **Health Information Exchange (HIE)** – Facilitates secure clinical data sharing (e.g., via C‑CDA or FHIR) among providers and sometimes public health agencies.

## 4. Data Exchange Standards by Participant Pair

| Participant Pair | Document / Transaction Type | Standard (X12 / HL7 / other) |
| :--- | :--- | :--- |
| Employer → Insurance Co. | Benefit enrollment & maintenance | X12 834 |
| Employer → Insurance Co. | Premium payment & remittance | X12 820 |
| Employer → Workers’ Comp Co. | First report of injury | X12 148 |
| Provider → Insurance Co. | Claim (professional, institutional, dental) | X12 837 |
| Insurance Co. → Provider | Payment remittance advice | X12 835 |
| Provider ↔ Insurance Co. | Eligibility inquiry / response | X12 270 / 271 |
| Provider ↔ Insurance Co. | Prior authorization request / response | X12 278 |
| Provider → HIE | Clinical summary (e.g., CCD) | C‑CDA (XML) |
| Provider ↔ Provider (via HIE) | Patient clinical data query / result | HL7 FHIR |
| Pharmacy → PBM | Prescription claim | NCPDP SCRIPT |
| PBM → Insurance Co. | Drug benefit administration | X12 (e.g., 834) |
| PBM ↔ Pharma | Rebate & formulary data | Proprietary / contract files |
| Pharma → Insurance Co. (via PBM) | Rebate reconciliation | Proprietary flat file |
| Provider ↔ Clearinghouse | Claims & remittance translation | X12 (837, 835, 270/271) |
| Clearinghouse → Insurance Co. | Normalized X12 transactions | X12 (same as above) |
| Government (CMS) ↔ Insurance Co. | Medicare/Medicaid payment & reporting | X12 (837, 835, 820) + CMS files |
| Government (CMS) → Provider | Quality measure reporting (e.g., MIPS) | HL7 QRDA (based on CDA) |
| Patient ↔ Insurance Co. | Explanation of benefits (EOB) | Paper / PDF (non‑standard) |
| Patient ↔ Provider | Consent, medical history forms | Paper / portal (non‑standard) |

## 5. Key Takeaways

- **X12 is for Administrative & Financial Transactions:** It is the standard for the business side of healthcare, used between providers and payers for claims, payments, and eligibility checks.
- **FHIR is for Modern API-Based Access:** It is designed for real-time, "on-demand" access to specific data, powering patient portals, mobile apps, and integrations between EHRs.
- **C-CDA is for Clinical Document Exchange:** It is used for sharing complete clinical summaries, such as for patient referrals, transfer of care, or when a patient is discharged from a hospital.
