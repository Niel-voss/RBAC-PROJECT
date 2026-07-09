```mermaid
C4Context
    title System Context - University RBAC Architecture

    %% The Users (Actors)
    Person(user, "Student / Lecturer", "Campus user accessing portal resources.")
    Person(admin, "System Admin", "Manages roles and campus security policies.")

    %% The Core System
    System(rbac_system, "Dynamic RBAC System", "Central engine evaluating and dictating permissions.")

    %% External Systems
    System_Ext(idp, "Identity Provider", "Handles user login and sessions via Auth.js.")
    System_Ext(campus_portal, "University Portal", "Main web app with student records and courses.")

    %% Shortened Relationships to prevent overlap
    Rel(user, campus_portal, "Uses", "HTTPS")
    Rel(admin, rbac_system, "Configures", "HTTPS")
    Rel(campus_portal, rbac_system, "Checks Access", "API")
    Rel(rbac_system, idp, "Authenticates", "JWT")
    ````