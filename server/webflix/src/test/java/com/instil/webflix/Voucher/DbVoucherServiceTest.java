package com.instil.webflix.Voucher;

import static org.junit.Assert.*;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.constraints.AssertTrue;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;

import com.instil.webflix.movies.data.MovieRepository;
import com.instil.webflix.voucher.data.VoucherRepository;
import com.instil.webflix.voucher.model.Voucher;
import com.instil.webflix.voucher.service.DbVoucherService;

@RunWith(MockitoJUnitRunner.class)
public class DbVoucherServiceTest {
	
	@Mock
	VoucherRepository vRepoMock;
	
	@Mock
	MovieRepository mRepoMock;
	
	@Mock
	Voucher voucherMock;
	
	@Mock
	List<Voucher> voucherListMock;
	
	@Mock
	Date dateMock;
	
	@Mock
	Iterator<Voucher> vIteratorMock;
	
	@InjectMocks
	DbVoucherService db;
	
	@Before
	public void setUp()
	{
		db = new DbVoucherService();
		
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testFindVoucherByNameInvalidName()
	{
		when(vRepoMock.findByName("NONE")).thenReturn(null);
		assertFalse("Name was accepted", db.getVoucherValid("NONE"));
	}
	
	@Test
	public void testFindVoucherByNameValidName()
	{
		when(vRepoMock.findByName("SAVEBOGOF")).thenReturn(voucherMock);
		assertTrue("Name was not accepted", db.getVoucherValid("SAVEBOGOF"));
	}
	
	@Test
	public void testCallGetAllVouchers()
	{
		when(vRepoMock.findAll()).thenReturn(voucherListMock);
		List<Voucher> resp = db.getAllVouchers();
		assertEquals("Mocked response did not mimic actual response", resp, voucherListMock);
	}
	
	@Test
	public void shouldCreateVoucherIfParamsValid()
	{
		Date synchedDate = new Date(new Date().getTime());
		db.createVoucher("AHA", "50% OFF", synchedDate);
		assertTrue("Voucher was not created", db.validVoucher("AHA", "50% OFF", synchedDate));
		verify(vRepoMock, times(1)).addVoucher("AHA", "50% OFF", synchedDate);
	}
	
	@Test
	public void shouldNotCreateVoucherIfParamsInvalid()
	{
		db.createVoucher("AHA", "buy2 get 1 fre", new Date());
		assertFalse("Voucher was created", db.validVoucher("AHA", "buy2 get 1 fre", new Date()));
	}
	
	@Test
	public void shouldReturnTrueForCorrectFormats()
	{
		assertTrue("Buy format not accepted", db.validFormat("BUY 1 GET 1 FREE"));
		assertTrue("Spend format not accepted", db.validFormat("SPEND 50 GET 25 OFF"));
		assertTrue("Discount format not accepted", db.validFormat("20% OFF"));
	}
	
	@Test
	public void shouldReturnFalseForIncorrectFormats()
	{
		assertFalse("Buy format accepted", db.validFormat("BU 1 Get 1FREE"));
		assertFalse("Spend format accepted", db.validFormat("SPEND50 ET 25 OFf"));
		assertFalse("Discount format accepted", db.validFormat("20%OF"));
	}
	
	@Test
	@Ignore
	public void shouldSetExpiredGlobalToFalse()
	{
		when(vRepoMock.findByGlobalTrue()).thenReturn(new Voucher(new Long(1), "SAVINGBIG", "SPEND 20 GET 10 OFF", true, new Date()));
		db.checkForExpiredGlobal();
		verify(vRepoMock, times(1)).setAllGlobalFalse();
	}
	
	@Test
	public void shouldCatchBadExpiryDateOrCodeAlreadyInUse()
	{
		
		assertFalse("Bad Date not caught", db.validVoucher("AHA", "SPEND 30 GET 15 OFF", new Date(new Date().getTime() - 10000000)));
//		assertFalse("Bad Code not caught", db.validVoucher("SAVEBOGOF", "SPEND 30 GET 15 OFF", new Date(new Date().getTime())));
	}
	
	@Test
	public void testValuesOfBuyXGetYFreeSuccess()
	{
		String discount = "BUY 1 GET 1 FREE";
		assertTrue("Values were not accepted", db.validDiscount(discount, discount.split(" ")));
	}
	
	@Test
	public void testValuesOfSpendXGetYOffSuccess()
	{
		String discount = "SPEND 20 GET 10 OFF";
		assertTrue("Values were not accepted", db.validDiscount(discount, discount.split(" ")));
	}
	
	@Test
	public void testValuesOfDiscountSuccess()
	{
		String discount = "30% OFF";
		assertTrue("Values were not accepted", db.validDiscount(discount, discount.split(" ")));
	}
	
	@Test
	public void testValuesOfBuyXGetYFreeFailures()
	{
		String discountType = "BUY";
		assertFalse("Value for x was accepted", db.validDiscount(discountType, "BUY 250 GET 1 FREE".split(" ")));
		assertFalse("Value for x was accepted", db.validDiscount(discountType, "BUY 0 GET 1 FREE".split(" ")));
		assertFalse("Value for y was accepted", db.validDiscount(discountType, "BUY 1 GET 250 FREE".split(" ")));
		assertFalse("Value for y was accepted", db.validDiscount(discountType, "BUY 1 GET 0 FREE".split(" ")));
		
	}
	
	@Test
	public void testValuesOfSpendXGetYOffFailures()
	{
		String discountType = "SPEND";
		assertFalse("Value for x was accepted", db.validDiscount(discountType, "SPEND 0 GET 25 OFF".split(" ")));
		assertFalse("Value for x was accepted", db.validDiscount(discountType, "SPEND 10 GET 25 OFF".split(" ")));
		assertFalse("Value for x was accepted", db.validDiscount(discountType, "SPEND 25 GET 25 OFF".split(" ")));
		assertFalse("Value for y was accepted", db.validDiscount(discountType, "SPEND 20 GET 0 OFF".split(" ")));
	}
	@Test
	public void testValuesOfDiscountFailures()
	{
		String discountType = "DISCOUNT";
		assertFalse("Value for x was accepted", db.validDiscount(discountType, "0% OFF".split(" ")));
		assertFalse("Value for x was accepted", db.validDiscount(discountType, "101% OFF".split(" ")));
	}
}
