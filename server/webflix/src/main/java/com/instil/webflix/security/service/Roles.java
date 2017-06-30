package com.instil.webflix.security.service;

import com.instil.webflix.security.model.Role;

public interface Roles {
    Role getAdminRole();

    Role getUserRole();
}
