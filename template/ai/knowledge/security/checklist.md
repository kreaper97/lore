# Security review checklist
Owner: Security · Last verified: TODO(verify)

- [ ] Every endpoint/action checks authN and authZ (ownership — no IDOR)
- [ ] All external input validated server-side (schema)
- [ ] Output encoded; no raw HTML injection
- [ ] No secrets in code, logs, client bundles
- [ ] No PII in logs/analytics; PII inventory updated
- [ ] Rate limiting on auth and expensive endpoints
- [ ] CSRF/CORS/cookie flags correct
- [ ] File uploads: type/size checked, stored outside web root, scanned
- [ ] Webhooks verify signatures
- [ ] New deps scanned, licenses OK
- [ ] Threat model updated
