# TransitFlow — Monolith Starter (Next.js + NestJS)

Architecture: **Next.js (front)** + **NestJS (API)** + Postgres + Redis (optionnel) + MailHog (emails dev).  
Objectif: MVP fonctionnel avec jalons (milestones), génération PDF simple et notification email.

## Démarrage rapide (dev)
1) Prérequis: Node 18+, Docker Desktop.
2) Lancez les services de base:
```bash
docker compose up -d
```
3) Copiez `.env.example` → `.env` dans `/server` et `/web`, puis ajustez si besoin.
4) Installez les deps et démarrez en parallèle:
```bash
cd server && npm install && npm run prisma:generate && npm run dev
# dans un autre terminal
cd web && npm install && npm run dev
```
5) Ouvrez le front: http://localhost:3000 | API: http://localhost:4000

## Fonctionnalités incluses
- Création de shipment (dossier) et enregistrement de milestones.
- Email automatique au client à chaque milestone (SMTP dev via MailHog http://localhost:8025).
- Génération PDF simple (BL/POD fictifs) et pièces jointes dans l’email.
- CORS activé pour le front.
- Schéma Prisma minimal: `Shipment`, `Milestone`, `Document` (à étoffer).

## Services Docker
- Postgres (localhost:5432, user: postgres / pass: transitflow)
- MailHog (SMTP: 1025, UI: http://localhost:8025)
- Redis (optionnel; pour BullMQ si vous l’activez plus tard)

## Notes
- Stockage fichiers: par défaut local (`server/storage`). Vous pourrez passer à MinIO/S3 plus tard.
- Tracking navire: placeholder (hook prêt).

---
