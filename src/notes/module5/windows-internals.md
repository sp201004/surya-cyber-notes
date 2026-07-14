### Windows Internals
Windows is the dominant operating system for corporate workplaces and endpoints. Securing or attacking Windows networks requires understanding how the OS handles user permissions, logs events, and stores system configurations.

#### Key Windows Architecture Pillars
1. **The Windows Registry:**
   A massive hierarchical database that stores low-level configuration settings for the Windows operating system, device drivers, user preferences, and installed applications. It is split into hives like `HKLM` (Machine) and `HKCU` (User).

2. **Active Directory (AD):**
   A directory service developed by Microsoft for Windows domain networks. It allows central management of users, computers, permissions, and group policies across thousands of corporate laptops from a single domain controller.

3. **Event Viewer:**
   The centralized log system. It tracks Windows events categorized into Application, Security, System, and PowerShell execution logs. Security logs track logins, failed authentications, and privilege changes.

## Contents

- [Windows Internals](#windows-internals)
- [Key Windows Architecture Pillars](#key-windows-architecture-pillars)
