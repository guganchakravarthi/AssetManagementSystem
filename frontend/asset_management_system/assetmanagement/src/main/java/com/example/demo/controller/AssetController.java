package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AssetDto;
import com.example.demo.models.AssetModel;
import com.example.demo.service.AssetService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/asset")
@CrossOrigin(origins = "http://localhost:5173" , allowCredentials = "true") 
public class AssetController {
	@Autowired
	AssetService assetService;
	
	  @GetMapping("/")
	    public String getAssets(Model model) {
	        List<AssetModel> assets = assetService.getAssets();
	        model.addAttribute("assets", assets);
	        return "assets";  // Refers to assets.html
	    }
	
	
	@PostMapping("/insert")
	public AssetModel insert(@RequestBody AssetDto assetDto ) {
		return assetService.save(assetDto);
	}
	
	@PostMapping("/inserts/{count}")
	public List<AssetModel> inserts(@PathVariable("count")int count,@RequestBody AssetDto assetDto) {
		return assetService.bunch(count,assetDto);
	}
	

	
	@GetMapping("/assets")
	public List<AssetModel> Assets(){
		return assetService.getAssets();
	}
	
	@GetMapping("/assetsbyid/{id}")
	public ResponseEntity<?> getAssetById(@PathVariable("id")int id){
		return assetService.getAssetById(id);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteById(@PathVariable("id") int id){
		return assetService.deleteById(id);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<AssetModel>updated(@PathVariable("id")int id,@RequestBody AssetDto assetDto){
		Optional<AssetModel> updatedEntity=assetService.update(id,assetDto);
		if(updatedEntity.isPresent()) {
			return ResponseEntity.ok(updatedEntity.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	

}
