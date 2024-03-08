1) La distinction entre un patch et un put réside dans la quantité de données que nous prévoyons de mettre à jour. Un put est utilisé pour mettre à jour une vaste quantité d'informations sur nos données, tandis qu'un patch est employé pour mettre à jour uniquement un champ spécifique.

2) Bien que la requête puisse sembler identique, le user-agent (qui indique l'outil à partir duquel la requête est envoyée) peut être bloqué par le serveur web de destination.

3) Les serveurs web jouent un rôle crucial dans des aspects tels que l'équilibrage de charge (load balancing) ou la stabilité générale. Ils sont également indispensables pour la gestion de la sécurité, comme la gestion des CORS ou des certificats SSL (bien que la gestion des CORS puisse être effectuée côté code, elle est souvent réalisée côté serveur). De plus, ils peuvent gérer diverses redirections dans notre application.

4) 
- La mise en cache des données constitue le principal axe d'optimisation
- Optimisation et de la limitation des requêtes à la base de données (souvent parmi les opérations les plus coûteuses en temps dans une requête HTTP)
- Compression des données, notamment avec Gzip (ou tout autre outil similaire).