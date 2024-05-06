package com.demo.helpers;

import java.util.Random;

public class RandomHelper {
	public static String generate(int length) {
		String alphabet = new String("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
		int n = alphabet.length(); 
		String result = new String();
		Random r = new Random();
		for (int i = 0; i < length; i++) {
			result = result + alphabet.charAt(r.nextInt(n));
		}
		return result;
	}
}
