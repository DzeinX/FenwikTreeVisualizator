class BinaryIndexedTree {
    constructor(elements) {
        this.fill(elements);
    }

    refill(elements) {
        this.clear();
        this.fill(elements);
    }

    clear() {
        this.btree = Array();
        this.lenght = 0;
    }

    fill(elements) {
        if (!Array.isArray(elements)) {
            throw "Это не массив";
        }

        this.btree = new Array(elements.length);
        this.btree.fill(0);
        this.lenght = elements.length;

        for (let i = 0; i < elements.length; i++) {
            this.setValue(i, elements[i]);
        }
    }

    get(index) {
        const result = this.getSumTo(index);

        return index > 0 ? result - this.getSumTo(index - 1) : result;
    }

    setValue(index, value) {
        const oldValue = this.get(index);

        const difference = value - oldValue;

        while (index < this.btree.length) {
            this.btree[index] += difference;
            index |= (index + 1);
        }
    }

    setValueByStep(index, difference) {
        this.btree[index] += difference;
    }

    unSetValueByStep(index, difference) {
        this.btree[index] -= difference;
    }

    getSumFromTo(fromIndexInclusive, toIndexInclusive) {
        if (fromIndexInclusive > toIndexInclusive) {
            throw "From index > to index";
        }

        const leftSum = fromIndexInclusive > 0 ? this.getSumTo(fromIndexInclusive - 1) : 0;
        return this.getSumTo(toIndexInclusive) - leftSum;
    }

    getSumTo(toIndexIInclusive) {
        if (toIndexIInclusive >= this.btree.length) {
            throw "to index > tree length";
        }

        let result = 0;

        while (toIndexIInclusive >= 0) {
            result += this.btree[toIndexIInclusive];
            if (toIndexIInclusive === 0) {
                break;
            }
            toIndexIInclusive &= toIndexIInclusive + 1;
            toIndexIInclusive--;
        }
        return result;
    }
}

export default BinaryIndexedTree;