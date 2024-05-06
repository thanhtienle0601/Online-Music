package com.demo.dtos;

public class UserDto {
	
	private Integer id;
	private String fullname;
	private String email;
	private String phone;
	private String username;
	private String password;
	private String avt;
	private String code;
	private boolean status;
	private boolean ispremium;
	
	public UserDto() {}
	
	public UserDto(Integer id, String fullname, String email, String phone, String username, String password,
			String avt, String code, boolean status, boolean ispremium) {
		super();
		this.id = id;
		this.fullname = fullname;
		this.email = email;
		this.phone = phone;
		this.username = username;
		this.password = password;
		this.avt = avt;
		this.code = code;
		this.status = status;
		this.ispremium = ispremium;
	}

	public UserDto(Integer id, String fullname, String email, String phone, String username, String password,
			boolean status, boolean ispremium) {
		super();
		this.id = id;
		this.fullname = fullname;
		this.email = email;
		this.phone = phone;
		this.username = username;
		this.password = password;
		this.status = status;
		this.ispremium = ispremium;
	}

	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public boolean isIspremium() {
		return ispremium;
	}

	public void setIspremium(boolean ispremium) {
		this.ispremium = ispremium;
	}

	public String getAvt() {
		return avt;
	}

	public void setAvt(String avt) {
		this.avt = avt;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
}
