
/*
CREATE TABLE `users`
(
  `id`            INT(11) NOT NULL auto_increment ,
  `name`          VARCHAR(255) NOT NULL ,
  `last_name` VARCHAR(255) NOT NULL ,
  `password`     VARCHAR(255) NOT NULL,
  `email`    VARCHAR(255) NOT NULL ,
  `status`    INT NOT NULL ,
  `role`    INT NOT NULL ,
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`),
  UNIQUE `idx_email_unique` (`email`(255))
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;


CREATE TABLE `logs`
(
  `id`            INT NOT NULL auto_increment ,  
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `description`    VARCHAR(550) NOT NULL ,
  `type`    INT NOT NULL ,   
  PRIMARY KEY (`id`)
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;
 

/*