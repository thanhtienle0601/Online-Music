package com.demo.dtos;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class InvoiceDto {
	private Integer id;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date startDate;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date endDate;
	private double total;
	private boolean status;
	private Integer pack_id;
	private String pack_name;
	private Integer user_id;
	private String user_name;
	
	public InvoiceDto() {}
	
	public InvoiceDto(Integer id, Date startDate, Date endDate, double total, Integer pack_id, String pack_name,
			Integer user_id, String user_name) {
		super();
		this.id = id;
		this.startDate = startDate;
		this.endDate = endDate;
		this.total = total;
		this.pack_id = pack_id;
		this.pack_name = pack_name;
		this.user_id = user_id;
		this.user_name = user_name;
	}

	public InvoiceDto(Integer id, Date startDate, Date endDate, double total, boolean status, Integer pack_id,
			String pack_name, Integer user_id, String user_name) {
		super();
		this.id = id;
		this.startDate = startDate;
		this.endDate = endDate;
		this.total = total;
		this.status = status;
		this.pack_id = pack_id;
		this.pack_name = pack_name;
		this.user_id = user_id;
		this.user_name = user_name;
	}
	
	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public Integer getPack_id() {
		return pack_id;
	}

	public void setPack_id(Integer pack_id) {
		this.pack_id = pack_id;
	}

	public String getPack_name() {
		return pack_name;
	}

	public void setPack_name(String pack_name) {
		this.pack_name = pack_name;
	}

	public Integer getUser_id() {
		return user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	
	
}
