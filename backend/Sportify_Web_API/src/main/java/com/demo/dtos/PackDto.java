package com.demo.dtos;

public class PackDto {
	private Integer id;
	private String name;
	private double price;
	
	public PackDto() {}
	
	public PackDto(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	

	public PackDto(Integer id, String name, double price) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	
}
