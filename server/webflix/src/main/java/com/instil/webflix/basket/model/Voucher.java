package com.instil.webflix.basket.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String offer;
    private Boolean global;
    private Date expire;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOffer() {
        return offer;
    }

    public void setOffer(String offer) {
        this.offer = offer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public Boolean getGlobal() {
    	return global;
    }
    
    public void setGlobal(Boolean global) {
    	this.global = global;
    }
    
    public Date getExpire() {
    	return expire;
    }
    
    public void setExpire(Date expire) {
    	this.expire = expire;
    }
}
