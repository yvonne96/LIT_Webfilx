package com.instil.webflix.security.service;

import com.instil.webflix.security.data.RoleRepository;
import com.instil.webflix.security.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DbRoles implements Roles {
    private final Role adminRole;
    private final Role userRole;

    @Autowired
    public DbRoles(RoleRepository roleRepository) {
        this.adminRole = roleRepository.findOneByName("ADMIN");
        this.userRole = roleRepository.findOneByName("USER");
    }

    public Role getAdminRole(){
        return adminRole;
    }

    public Role getUserRole() {
        return userRole;
    }
}
