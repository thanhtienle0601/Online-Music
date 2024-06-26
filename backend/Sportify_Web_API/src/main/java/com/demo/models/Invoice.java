package com.demo.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import static jakarta.persistence.GenerationType.IDENTITY;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 * Invoice generated by hbm2java
 */
@Entity
@Table(name = "invoice")
public class Invoice implements java.io.Serializable {

	private Integer id;
	private Pack pack;
	private User user;
	private Date startDate;
	private Date endDate;	
	private double total;
	private boolean status;
	
	public Invoice() {
	}

	public Invoice(Pack pack, User user, Date startDate, Date endDate, double total) {
		this.pack = pack;
		this.user = user;
		this.startDate = startDate;
		this.endDate = endDate;
		this.total = total;
	}	

	public Invoice(Integer id, Pack pack, User user, Date startDate, Date endDate, boolean status, double total) {
		super();
		this.id = id;
		this.pack = pack;
		this.user = user;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = status;
		this.total = total;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "packid", nullable = false)
	public Pack getPack() {
		return this.pack;
	}

	public void setPack(Pack pack) {
		this.pack = pack;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userid", nullable = false)
	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "startdate", nullable = false, length = 10)
	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "enddate", nullable = false, length = 10)
	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@Column(name = "total", nullable = false, precision = 22, scale = 0)
	public double getTotal() {
		return this.total;
	}

	public void setTotal(double total) {
		this.total = total;
	}
	
	@Column(name = "status", nullable = false)
	public boolean getStatus() {
		return this.status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

}
