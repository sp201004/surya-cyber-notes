## Contents

- [Room Information](#room-information)
- [Learning Objectives](#learning-objectives)
- [What Is Cloud Computing?](#what-is-cloud-computing)
- [Why Cloud Computing Exists — On-Prem vs Cloud](#why-cloud-computing-exists--on-prem-vs-cloud)
- [Cloud Service Models](#cloud-service-models)
- [The Pizza-as-a-Service Analogy](#the-pizza-as-a-service-analogy)
- [Shared Responsibility — Who Manages What](#shared-responsibility--who-manages-what)
- [Cloud Deployment Models](#cloud-deployment-models)
- [Cloud Regions & Availability Zones](#cloud-regions--availability-zones)
- [Cloud Billing Basics](#cloud-billing-basics)
- [Major Cloud Providers](#major-cloud-providers)
- [Cloud Security — Shared Responsibility & Misconfigurations](#cloud-security--shared-responsibility--misconfigurations)
- [Interview Questions](#interview-questions)
- [Quick Revision](#quick-revision)

> **Platform:** TryHackMe
> **Path:** Pre Security → Computer Fundamentals → Cloud Computing Fundamentals
> **Difficulty:** Easy
> **Prerequisite:** Virtualization Basics
> **Status:** Completed

---

```
███████╗██████╗     ████████╗██████╗ ██╗   ██╗██╗  ██╗ █████╗  ██████╗██╗  ██╗███╗   ███╗███████╗
██╔════╝██╔══██╗    ╚══██╔══╝██╔══██╗╚██╗ ██╔╝██║  ██║██╔══██╗██╔════╝██║ ██╔╝████╗ ████║██╔════╝
███████╗██████╔╝       ██║   ██████╔╝ ╚████╔╝ ███████║███████║██║     █████╔╝ ██╔████╔██║█████╗
╚════██║██╔═══╝        ██║   ██╔══██╗  ╚██╔╝  ██╔══██║██╔══██║██║     ██╔═██╗ ██║╚██╔╝██║██╔══╝
███████║██║            ██║   ██║  ██║   ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗██║ ╚═╝ ██║███████╗
╚══════╝╚═╝            ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝

                     Cloud Computing Fundamentals
```

---

## Room Information
| Room | Cloud Computing Fundamentals |
|------|------------------------------|
| Platform | TryHackMe |
| Difficulty | Easy |
| Time | ~30 Minutes |
| Category | Computer Fundamentals |
| Prerequisite | Virtualization Basics |

---

## Learning Objectives
After completing this room you should understand:

- What Cloud Computing is
- Why Cloud Computing exists
- Cloud Service Models
- Cloud Deployment Models
- Cloud Regions & Availability Zones
- Cloud Billing Basics
- Major Cloud Providers

---

## What Is Cloud Computing?

> **KEY CONCEPT**
> Cloud computing delivers resources over the internet on-demand.

Instead of buying, powering, and maintaining your own physical servers, you **rent** computing resources — servers, storage, databases, networking, and software — from a cloud provider and access them over the internet. You pay only for what you use, and you can add or remove resources in minutes.

> **BEGINNER ANALOGY**
> Owning servers is like buying your own electricity generator: expensive, needs maintenance, and you must guess how much power you'll need.
> Cloud computing is like plugging into the power grid: you flip a switch, use exactly what you need, and get one bill for your usage.

Under the hood, the cloud is built on the **virtualization** you learned in the previous room — providers run massive fleets of servers, slice them into virtual machines and containers with a hypervisor, and rent those slices to millions of customers.

## Why Cloud Computing Exists — On-Prem vs Cloud

Before the cloud, every company ran **on-premises (on-prem)** infrastructure: they bought servers, built a data center, paid for power and cooling, and hired staff to run it all.

```
ON-PREMISES (Traditional)              CLOUD
------------------------               -----
Buy servers up front (CapEx)           Rent by the hour/second (OpEx)
Wait weeks for hardware                Provision in minutes
Guess capacity -> over/under-buy       Scale up or down on demand
You maintain power, cooling, staff     Provider maintains everything physical
Idle hardware = wasted money           Pay only for what you use
```

> **KEY INSIGHT**
> On-prem is a big **up-front** cost (CapEx) with fixed capacity. Cloud is a **pay-as-you-go** operating cost (OpEx) with elastic capacity. That flexibility — plus not having to run a data center — is why the cloud exists and why most modern services run on it.

| **Problem With On-Prem** | **How Cloud Solves It** |
| --- | --- |
| Huge up-front hardware cost | Rent resources, pay monthly for usage |
| Slow to scale (order + install servers) | Add capacity in minutes via a dashboard/API |
| Over-provisioning wastes money; under-provisioning causes outages | **Elasticity** — scale up during spikes, down when quiet |
| You run power, cooling, security, repairs | Provider handles all physical infrastructure |
| Hard to reach global users | Deploy in data centers around the world instantly |

## Cloud Service Models

Cloud providers sell computing at three main "levels." The higher you go, the **more** the provider manages for you and the **less** you have to worry about.

| **Model** | **What You Get** | **You Manage** | **Real Examples** |
| --- | --- | --- | --- |
| **IaaS** (Infrastructure as a Service) | Raw infrastructure (VMs, storage, networking). | OS, runtime, apps, and data on top of the VM. | AWS EC2, Google Compute Engine, Azure VMs |
| **PaaS** (Platform as a Service) | Platform for building apps (no server management). | Just your application code and data. | Heroku, Google App Engine, Azure App Service |
| **SaaS** (Software as a Service) | Ready-to-use software (Gmail, Office 365). | Only your data and settings — nothing technical. | Gmail, Microsoft 365, Salesforce, Dropbox |

> **TIP: How to remember them**
> **IaaS** = you get the bare **Infrastructure** (a blank server).
> **PaaS** = you get a **Platform** to deploy code onto.
> **SaaS** = you get finished **Software** you just log into.

## The Pizza-as-a-Service Analogy

The classic way to remember the models is "pizza as a service" — how much of the meal do *you* make versus how much is done *for* you?

| **Approach** | **Pizza Version** | **Cloud Equivalent** |
| --- | --- | --- |
| **On-Premises** | Make it at home — you buy every ingredient, use your own oven, kitchen, and electricity. | Run your own data center. |
| **IaaS** | Take-and-bake — the shop supplies the dough and toppings (the infrastructure); you still bake it in your oven and serve it. | Rent VMs; you install and run everything on top. |
| **PaaS** | Pizza delivery — they cook and deliver it; you just supply the table, drinks, and place to eat. | Deploy your code; the provider runs the servers. |
| **SaaS** | Dining out — you show up and eat; someone else handles everything. | Just log in and use the app. |

## Shared Responsibility — Who Manages What

As you move from IaaS toward SaaS, responsibility shifts from **you** to the **provider**. This is the **Shared Responsibility Model**, and it is one of the most important ideas in cloud security.

```
                 IaaS          PaaS          SaaS
              +---------+   +---------+   +---------+
   Data       |   YOU   |   |   YOU   |   |   YOU   |
   Application|   YOU   |   |   YOU   |   | PROVIDER|
   Runtime    |   YOU   |   | PROVIDER|   | PROVIDER|
   OS         |   YOU   |   | PROVIDER|   | PROVIDER|
   Hypervisor | PROVIDER|   | PROVIDER|   | PROVIDER|
   Servers    | PROVIDER|   | PROVIDER|   | PROVIDER|
   Networking | PROVIDER|   | PROVIDER|   | PROVIDER|
   Data Center| PROVIDER|   | PROVIDER|   | PROVIDER|
              +---------+   +---------+   +---------+

   Rule of thumb: the provider secures the cloud;
   YOU secure what you put IN the cloud (your data & config).
```

> **IMPORTANT**
> No matter the model, **your data and your access settings are always your responsibility**. The provider secures the building and the hardware — you secure who can open your files.

## Cloud Deployment Models

Deployment models describe **who the cloud is for** and **where it lives**.

| **Model** | **What It Is** | **Best For** |
| --- | --- | --- |
| **Public** | Shared infrastructure owned by a provider, rented to the general public (multi-tenant). | Most workloads — cheap, elastic, no hardware to manage. |
| **Private** | Cloud dedicated to a single organization (on-prem or hosted). | Strict compliance, sensitive data, full control. |
| **Hybrid** | A mix of public and private, connected together. | Keep sensitive data private, burst to public for scale. |
| **Community** | Shared by several organizations with common needs (e.g. government, healthcare). | Groups with shared compliance requirements. |

> **REMEMBER**
> **Public** cloud is shared; **Private** cloud is dedicated; **Hybrid** combines both.

## Cloud Regions & Availability Zones

Cloud providers run data centers all over the world, organized into **Regions** and **Availability Zones (AZs)**.

```
        REGION  (e.g. "us-east-1" — a geographic area)
        │
        ├── Availability Zone A   (one or more isolated data centers)
        ├── Availability Zone B   (separate power, cooling, network)
        └── Availability Zone C
                │
                └── Each AZ is far enough apart that one failing
                    (fire, flood, power cut) does NOT take down the others.
```

- **Regions** provide geographic redundancy.
- **Availability Zones** protect against datacenter failure.

> **WHY REDUNDANCY MATTERS**
> Spread your app across **multiple AZs** and it survives a single data center outage (**high availability**). Spread across **multiple regions** and it survives a whole-region disaster and serves users faster by being physically closer to them (**disaster recovery + low latency**).

## Cloud Billing Basics

The core cloud pricing idea is **pay-as-you-go**: you are charged for the resources you actually use (compute time, storage, data transfer), with no big up-front purchase.

| **Pricing Option** | **How It Works** | **Trade-off** |
| --- | --- | --- |
| **On-Demand (Pay-as-you-go)** | Pay per second/hour with no commitment. | Most flexible, highest price per unit. |
| **Reserved** | Commit to 1–3 years of usage up front. | Big discount, but you're locked in. |
| **Spot / Preemptible** | Use the provider's spare capacity cheaply. | Very cheap, but can be reclaimed at any time. |

- Cloud billing is **pay-as-you-go**.

> **TIP**
> Most providers offer a **free tier** for learning. The most common beginner mistake is leaving resources running — an idle VM or unused storage still bills you, so always shut down or delete lab resources when you're done.

## Major Cloud Providers

Three providers dominate the market. They offer similar building blocks under different names.

| **Provider** | **Known For** | **Example Service (VMs)** |
| --- | --- | --- |
| **AWS** (Amazon Web Services) | Market leader, largest catalog of services. | EC2 (compute), S3 (storage) |
| **Azure** (Microsoft) | Strong enterprise & Windows / Active Directory integration. | Azure Virtual Machines |
| **GCP** (Google Cloud Platform) | Strong in data, analytics, AI/ML, and Kubernetes. | Compute Engine |

- Major providers: **AWS, Azure, GCP**.

## Cloud Security — Shared Responsibility & Misconfigurations

The cloud is powerful, but the shared responsibility model means **your** mistakes — not the provider's — cause most cloud breaches. The single biggest cloud risk is **misconfiguration**.

> **COMMON CLOUD MISCONFIGURATIONS**
> * Storage buckets (e.g. AWS S3) accidentally set to **public**.
> * **Overly permissive IAM roles** that grant far more access than needed.
> * Security groups / firewalls left **open to the whole internet** (0.0.0.0/0).
> * **No MFA** on privileged accounts.
> * Sensitive data stored **unencrypted**.

> **REAL-WORLD CASE: The Capital One Breach (2019)**
> An attacker exploited a **misconfigured Web Application Firewall (WAF)** on AWS to reach an S3 bucket holding the personal data of over **100 million** customers. The root cause was an **overly permissive IAM role** attached to the WAF, allowing it to read from S3.
> **Lesson:** In IaaS/PaaS, a single misconfiguration on the *customer* side can expose enormous amounts of data. Understanding the cloud models — and who secures what — is essential for security.

## Interview Questions

- **What is cloud computing?** Delivering computing resources (servers, storage, databases, software) over the internet on-demand, paying only for what you use instead of owning hardware.
- **IaaS vs PaaS vs SaaS?** IaaS = raw infrastructure you manage (AWS EC2); PaaS = a platform to deploy code, provider runs the servers (App Engine/Heroku); SaaS = finished software you just use (Gmail, Office 365).
- **Public vs Private vs Hybrid cloud?** Public is shared and provider-owned; Private is dedicated to one organization; Hybrid connects both.
- **Region vs Availability Zone?** A Region is a geographic area; an Availability Zone is one or more isolated data centers within that region. Multiple AZs protect against a single data center failure.
- **What is the Shared Responsibility Model?** The provider secures the cloud (hardware, hypervisor, physical facilities); the customer secures what they put in it (data, access/IAM, configuration).
- **What is the #1 cause of cloud breaches?** Customer misconfiguration — e.g. public storage buckets and overly permissive IAM roles.

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| What is cloud computing? | Delivering computing resources over the internet on-demand, pay-as-you-go, instead of owning hardware. |
| Why does the cloud exist? | It replaces costly, fixed on-prem hardware (CapEx) with flexible, elastic, pay-as-you-go resources (OpEx). |
| Which cloud service model gives you raw VMs and storage to manage yourself? | IaaS |
| Gmail and Office 365 are examples of which cloud service model? | SaaS |
| What cloud deployment model combines public and private clouds? | Hybrid |
| What protects against a single data center failure within a cloud region? | Availability Zone |
| Who secures your data in the cloud? | You do — the provider secures the infrastructure, you secure your data and configuration. |
| What is the most common cause of cloud breaches? | Misconfiguration (public buckets, over-permissive IAM roles). |
| Name the three major cloud providers. | AWS, Azure, GCP. |
