package com.instil.webflix.security.data;

import com.instil.webflix.security.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findOneByName(String name);
}
