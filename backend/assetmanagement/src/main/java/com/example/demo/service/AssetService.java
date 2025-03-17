package com.example.demo.service;



import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AssetDto;
import com.example.demo.models.AssetModel;
import com.example.demo.repository.AssetRepository;

@Service
public class AssetService {
	@Autowired
	AssetRepository assetRepository;

	public AssetModel save(AssetDto assetDto) {
		AssetModel assetModel=new AssetModel( assetDto.getName(),assetDto.getType(),assetDto.getStatus(),assetDto.getPurchaseDate(),assetDto.getPrice());
		return assetRepository.save(assetModel) ;
	}

	public Optional<AssetModel> updatedata(int id, AssetDto assetDto) {
		Optional<AssetModel> existingAsset =assetRepository.findById(id);
		if(existingAsset.isPresent()) {
			AssetModel assetModel=existingAsset.get();
			assetModel.setName(assetDto.getName());
			assetModel.setType(assetDto.getType());
			assetModel.setStatus(assetDto.getStatus());
			
			 assetRepository.save(assetModel);
		}
		return existingAsset;
	}

	public List<AssetModel> getAssets() {
		return assetRepository.findAll();
	}

	public ResponseEntity<?> getAssetById(int id) {
		Optional<AssetModel> model=assetRepository.findById(id);
		if(model.isPresent()) {
			return ResponseEntity.ok(model.get());
		}
		else {
			return ResponseEntity.status(404).body("not found");
		}
		
	}

	public ResponseEntity<String> deleteById(int id) {
		if(!assetRepository.existsById(id)) {
			return ResponseEntity.status(404).body("not found");
			
		}
		else {
			assetRepository.deleteById(id);
			return ResponseEntity.ok("deleted successfully");
		}
		
	}

	public Optional<AssetModel> update(int id, AssetDto assetDto) {
		Optional<AssetModel> entity=assetRepository.findById(id);
		if(entity.isPresent()) {
			AssetModel assetModel=entity.get();
			
			assetModel.setName(assetDto.getName());
			assetModel.setStatus(assetDto.getStatus());
			assetModel.setType(assetDto.getType());
			
			assetRepository.save(assetModel);
			return Optional.of(assetModel);
			
		}
		
		return Optional.empty();
	}

	public List<AssetModel> bunch(int count, AssetDto assetDto) {
		List<AssetModel>entity=new ArrayList<>();
		for(int i=0;i<=count;i++) {
			AssetModel model= new AssetModel();
			model.setName(assetDto.getName());
			model.setType(assetDto.getType());
			model.setStatus(assetDto.getStatus());
			model.setPurchesDate(assetDto.getPurchaseDate());
			model.setPrice(assetDto.getPrice());
			
			entity.add(assetRepository.save(model));
		}
		return entity;
	}

	

}
