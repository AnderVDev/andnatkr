package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.RealEstateMgmt;
import com.andnatkr.server.repositories.RealEstateMgmtRepository;
import com.andnatkr.server.repositories.EstateRepository;
import com.andnatkr.server.services.RealEstateMgmtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class RealEstateMgmtServiceImpl implements RealEstateMgmtService {
    public final RealEstateMgmtRepository mgmtRepository;
    public final EstateRepository estatesRepository;

    @Override
    public RealEstateMgmt save(RealEstateMgmt input) {

        return mgmtRepository.save(input);
    }

    @Override
    public List<RealEstateMgmt> findAll() {
        return StreamSupport.stream(
                mgmtRepository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<RealEstateMgmt> findOne(Long id) {
        return mgmtRepository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return mgmtRepository.existsById(id);
    }

    @Override
    public RealEstateMgmt partialUpdated(Long id, RealEstateMgmt inputEntity) {
        inputEntity.setId(id);
        return mgmtRepository.findById(id).map(existingInput -> {
            Optional.ofNullable(inputEntity.getUser()).ifPresent(existingInput::setUser);
            Optional.ofNullable(inputEntity.getFinanceStatement()).ifPresent(existingInput::setFinanceStatement);
            Optional.ofNullable(inputEntity.getEstate()).ifPresent(existingInput::setEstate);
            Optional.ofNullable(inputEntity.getAmount()).ifPresent(existingInput::setAmount);
            Optional.ofNullable(inputEntity.getMonth()).ifPresent(existingInput::setMonth);
            Optional.ofNullable(inputEntity.getYear()).ifPresent(existingInput::setYear);
            Optional.ofNullable(inputEntity.getDetail()).ifPresent(existingInput::setDetail);
            Optional.ofNullable(inputEntity.getComments()).ifPresent(existingInput::setComments);
            return mgmtRepository.save(existingInput);
        }).orElseThrow(() -> new RuntimeException("Input Does not Exist"));
    }

    @Override
    public void delete(Long id) {
        mgmtRepository.deleteById(id);
    }

}
